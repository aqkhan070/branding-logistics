import { afterEach, describe, expect, it, vi } from "vitest";

const sdk = vi.hoisted(() => ({ streamText: vi.fn() }));
vi.mock("ai", () => ({
  streamText: sdk.streamText,
  validateUIMessages: vi.fn(async ({ messages }) => messages),
  convertToModelMessages: vi.fn(async (messages) => messages),
}));

import { createResponsesCall } from "../lib/ai/responses.server";
import { handleHelpChat } from "../lib/help-chat.server";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  sdk.streamText.mockReset();
});

describe("help chat cancellation", () => {
  it("does not report user cancellation as a runtime failure", () => {
    const controller = new AbortController();
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    sdk.streamText.mockReturnValue({});
    createResponsesCall(
      new Request("https://example.test/chat", { signal: controller.signal }),
      { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey: "test", model: "openai/gpt-6-astra" },
      [],
    );
    const options = sdk.streamText.mock.calls[0]?.[0];
    expect(options.abortSignal.aborted).toBe(false);
    controller.abort();
    options.onError({ error: new DOMException("This operation was aborted", "AbortError") });
    expect(log).not.toHaveBeenCalled();
    expect(options.abortSignal.aborted).toBe(true);
  });

  it("still reports genuine failures on active requests", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    sdk.streamText.mockReturnValue({});
    createResponsesCall(
      new Request("https://example.test/chat"),
      { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey: "test", model: "openai/gpt-6-astra" },
      [],
    );
    const error = new Error("Connection failed");
    sdk.streamText.mock.calls[0]?.[0].onError({ error });
    expect(log).toHaveBeenCalledWith(error);
  });

  it("returns 499 when canceled before upstream headers arrive", async () => {
    vi.stubEnv("LOVABLE_API_KEY", "test");
    const controller = new AbortController();
    sdk.streamText.mockImplementation(() => ({
      toUIMessageStreamResponse: () => {
        controller.abort();
        return new Response("", { status: 200 });
      },
    }));
    // Settle the provider header gate without making a billable call.
    const provider = await import("@ai-sdk/openai");
    vi.spyOn(provider, "createOpenAI").mockImplementation((config) => {
      const fakeFetch = vi.spyOn(globalThis, "fetch").mockRejectedValue(
        new DOMException("This operation was aborted", "AbortError"),
      );
      void config?.fetch?.("https://example.test/upstream").catch(() => {});
      expect(fakeFetch).toBeDefined();
      return { responses: () => ({}) } as unknown as ReturnType<typeof provider.createOpenAI>;
    });
    const response = await handleHelpChat(new Request("https://example.test/chat", {
      method: "POST",
      signal: controller.signal,
      body: JSON.stringify({ messages: [] }),
    }));
    expect(response.status).toBe(499);
  });
});