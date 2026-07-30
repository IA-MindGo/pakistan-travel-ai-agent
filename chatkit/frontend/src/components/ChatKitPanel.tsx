import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const starterMessages: Message[] = [
  {
    role: "assistant",
    content: "Assalam-o-Alaikum! I’m your Pakistan travel guide. Ask me about Hunza, Skardu, Lahore, budgets, routes, or family-friendly trips.",
  },
];

export function ChatKitPanel() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: history.map(({ role, content }) => ({ role, content })) }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const assistantMessage: Message = { role: "assistant", content: data.reply ?? "I’m here and ready to help." };
      setMessages([...history, assistantMessage]);
    } catch (error) {
      setMessages([
        ...history,
        {
          role: "assistant",
          content: "The assistant is unavailable right now. Please make sure the backend is running and the OpenAI key is configured.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-[80vh] w-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[var(--shadow-card)] backdrop-blur">
      <div className="flex items-center gap-3 border-b border-white/60 bg-white/70 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            Pakistan Travel Assistant
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
          </div>
          <div className="text-xs text-muted-foreground">Online · Ready for your next itinerary</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(240,248,244,0.8))] p-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={`${message.role}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/70 bg-white/90 text-foreground"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-sm text-muted-foreground">
              Thinking…
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-white/70 bg-white/80 p-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about destinations, budget, itinerary, food, or safety…"
          className="flex-1 rounded-full border border-border bg-background/70 px-4 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
