import { createFileRoute } from "@tanstack/react-router";
import { handleHelpChat } from "@/lib/help-chat.server";

// Public service information only: no customer records or messaging actions.
export const Route = createFileRoute("/api/public/help-chat")({
  server: { handlers: { POST: ({ request }) => handleHelpChat(request) } },
});
