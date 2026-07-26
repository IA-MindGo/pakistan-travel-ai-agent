import { useMemo } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const chatkit = useChatKit({
  api: {
    getClientSecret,
  },

  theme: {
    colorScheme: "light",

    radius: "pill",

    density: "normal",

    color: {
      grayscale: {
        hue: 126,
        tint: 7,
      },

      accent: {
        primary: "#0B6E4F", // Pakistan Green
        level: 2,
      },
    },

    typography: {
      baseSize: 16,
      fontFamily:
        '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
  },

  composer: {
    placeholder: "Tell me where you'd like to travel in Pakistan...",

    attachments: {
      enabled: false,
    },
  },

 startScreen: {
  greeting: `🇵🇰 Pakistan Travel AI Planner

Tell me about your trip:`,

  prompts: [
    {
      icon: "compass" as const,
      label: "🧭 Template Prompt",
      prompt: "Starting city: Lahore. Trip duration: 5 days. Travelers: 4. Budget: PKR 80,000. Travel style: Family trip."
    },
    {
      icon: "compass" as const,
      label: "🏔️ Explore Hunza",
      prompt: "Plan a 5-day trip to Hunza and Skardu from Islamabad."
    },
    {
      icon: "user" as const,
      label: "👨‍👩‍👧 Family Vacation",
      prompt: "Plan a family trip from Lahore with a budget of PKR 50,000."
    },
    {
      icon: "star" as const,
      label: "❤️ Honeymoon Escape",
      prompt: "Recommend the best honeymoon destinations in Pakistan."
    },
    {
      icon: "maps" as const,
      label: "🥾 Adventure Tour",
      prompt: "Suggest an adventure trip including hiking and camping."
    },
    {
      icon: "suitcase" as const,
      label: "💰 Budget Travel",
      prompt: "Plan a budget-friendly trip under PKR 30,000."
    },
    {
      icon: "calendar" as const,
      label: "🌸 Spring Destinations",
      prompt: "Where should I visit in Pakistan during spring?"
    },
    {
      icon: "calendar" as const,
      label: "❄️ Winter Escapes",
      prompt: "Recommend the best places to visit in winter."
    },
    {
      icon: "circle-question" as const,
      label: "⭐ Surprise Me",
      prompt: "Recommend an amazing destination in Pakistan."
    }
  ]
}
});
  return (
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  );
}
