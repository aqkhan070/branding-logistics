import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, ArrowUp, RotateCcw } from "lucide-react";
import mascot from "@/assets/movara-dispatch-assistant.png";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning";

const transport = new DefaultChatTransport({ api: "/api/public/help-chat" });
export function HelpChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => { if (open && !busy) textarea.current?.focus(); }, [open, busy]);
  function ask(question: string, source: string) {
    if (!question.trim() || busy) return;
    clearError();
    sendMessage({ text: question });
    setText("");
    textarea.current?.focus();
    window.__lovableEvents?.track?.("project.agent_question", { surface: "help_chat", source });
  }
  return <aside className="fixed bottom-5 right-5 z-[60] max-sm:bottom-3 max-sm:right-3">
    {open && <div role="dialog" aria-label="Movara help chat" className="mb-3 flex h-[min(600px,calc(100dvh-110px))] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-float">
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
        <img src={mascot} alt="" width={1024} height={1024} className="h-12 w-12 object-contain" />
        <div className="flex-1"><p className="font-display text-sm font-semibold">Milo · Movara</p><p className="text-xs text-muted-foreground">AI service assistant</p></div>
        <Button variant="ghost" size="icon" title="Clear conversation" aria-label="Clear conversation" onClick={() => { stop(); setMessages([]); clearError(); textarea.current?.focus(); }}><RotateCcw /></Button>
        <Button variant="ghost" size="icon" title="Close help chat" aria-label="Close help chat" onClick={() => setOpen(false)}><X /></Button>
      </div>
      <Conversation className="min-h-0 flex-1"><ConversationContent className="gap-5 p-4">
        {messages.length === 0 && <div className="py-3"><p className="font-display text-xl font-semibold">Let’s move your<br/>operations forward.</p><p className="mt-3 text-sm text-muted-foreground">Hi, I’m Milo. What would you like to build for your logistics business?</p><div className="mt-5 grid gap-2">{["Can you build a custom TMS?", "How do AI carrier agents work?", "Can you automate customer updates?"].map((q, i) => <Button key={q} variant="outline" className="h-auto justify-start whitespace-normal py-3 text-left" onClick={() => { window.__lovableEvents?.track?.("project.suggested_question", { surface: "help_chat", suggestion: String(i) }); ask(q, "suggestion"); }}>{q}</Button>)}</div></div>}
        {messages.map((m) => <Message key={m.id} from={m.role}><MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground">{m.parts.map((part, i) => part.type === "text" ? <MessageResponse key={i}>{part.text}</MessageResponse> : part.type === "reasoning" ? <Reasoning key={i} isStreaming={busy && m === messages.at(-1)}><ReasoningTrigger/><ReasoningContent>{part.text}</ReasoningContent></Reasoning> : null)}</MessageContent></Message>)}
        {status === "submitted" && <Shimmer>Thinking…</Shimmer>}
        {error && <p role="alert" className="break-words text-sm text-destructive">{error.message}</p>}
      </ConversationContent><ConversationScrollButton /></Conversation>
      <div className="border-t border-border p-3"><PromptInput onSubmit={({ text: value }) => ask(value, "typed")}><PromptInputTextarea ref={textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about your logistics project…" aria-label="Your question" className="min-h-16"/><PromptInputFooter className="justify-between"><span className="text-[10px] text-muted-foreground">AI-powered · Not saved</span><PromptInputSubmit status={status} onStop={stop} disabled={!busy && !text.trim()} className="h-9 w-9" aria-label={busy ? "Stop" : "Send question"}>{!busy && <ArrowUp/>}</PromptInputSubmit></PromptInputFooter></PromptInput></div>
    </div>}
    <Button aria-label={open ? "Hide help chat" : "Open help chat"} title="Chat with Milo" className="ml-auto flex h-16 w-16 rounded-full border-2 border-signal bg-navy text-navy-foreground shadow-float hover:bg-navy-2" onClick={() => setOpen(!open)}>{open ? <X/> : <img src={mascot} alt="" width={1024} height={1024} className="h-14 w-14 object-contain"/>}</Button>
  </aside>;
}