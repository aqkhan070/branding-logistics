import { convertToModelMessages, validateUIMessages } from "ai";
import { createResponsesCall } from "./ai/responses.server";
import { createLovableAiGatewayRunIdFetch, withLovableAiGatewayRunIdHeader } from "./ai/run-id.server";

const instructions = `You are Milo, Movara's logistics software service assistant. Be friendly, concise and specific. Movara designs custom TMS, fleet management, freight booking, WMS, tracking, logistics ERP, route/dispatch tools and customer portals. Services include integrations with GPS, accounting/ERP, payments, customer messaging, modernization and ongoing support. AI carrier agents can help match carriers, gather availability and coordinate dispatch; system agents can answer operational questions and automate shipment milestones, documents, invoicing and notifications. Dieseltech is the featured freight brokerage TMS: loads, carriers, lane maker, truck board, Quick Pay, QuickBooks sync, driver tracking, agent pay and 1099 filing. This is a branding site: tracking and notification scenes use sample data, not live shipments. You have no access to live customer data and cannot send email, WhatsApp or in-app notifications. Never claim you looked up a real load or performed an action. Explain these can be built into a customer's system. Do not invent prices, timelines, contact details or guaranteed results. Direct project enquiries to the Discuss Your Project/contact section. Do not mention programming languages or technology stacks. Respond in markdown, generally under 150 words. Ask at most one relevant follow-up. Stay focused on these services.`;

export async function handleHelpChat(request: Request) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) return Response.json({ message: "Live help is not configured yet." }, { status: 503 });
  try {
    const body = await request.json();
    const messages = await validateUIMessages({ messages: body.messages });
    const modelMessages = await convertToModelMessages(messages);
    const { result } = createResponsesCall(request, { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey: key, model: "openai/gpt-6-astra" }, modelMessages, instructions);
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onFinish: () => { /* Single session: intentionally no transcript storage. */ },
      onError: (error) => error instanceof Error ? error.message : "Live help could not respond. Please try again later.",
    });
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    return Response.json({ message: error instanceof Error ? error.message : "Invalid conversation." }, { status: 400 });
  }
}