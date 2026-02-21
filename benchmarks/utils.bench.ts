import { describe, bench } from "vitest";
import { cn, generateUUID, convertToUIMessages } from "@/lib/utils";
import type { CoreMessage } from "ai";

describe("cn - class name utility", () => {
  bench("merge simple class names", () => {
    cn("px-2", "py-1", "text-sm");
  });

  bench("merge with conditional classes", () => {
    cn("px-2", "py-1", false && "hidden", true && "block", undefined, null);
  });

  bench("merge conflicting tailwind classes", () => {
    cn("px-2 py-1 text-sm", "px-4 py-2 text-lg");
  });
});

describe("generateUUID", () => {
  bench("generate a UUID", () => {
    generateUUID();
  });
});

describe("convertToUIMessages", () => {
  const simpleMessages: CoreMessage[] = [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi there!" },
  ];

  const complexMessages: CoreMessage[] = [
    { role: "user", content: "What is the weather?" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "Let me check the weather for you." },
        {
          type: "tool-call",
          toolCallId: "call_1",
          toolName: "getWeather",
          args: { location: "San Francisco" },
        },
      ],
    },
    {
      role: "tool",
      content: [
        {
          type: "tool-result",
          toolCallId: "call_1",
          toolName: "getWeather",
          result: { temperature: 65, condition: "sunny" },
        },
      ],
    },
    { role: "assistant", content: "The weather in San Francisco is 65°F and sunny." },
  ];

  bench("convert simple messages", () => {
    convertToUIMessages(simpleMessages);
  });

  bench("convert messages with tool calls", () => {
    convertToUIMessages(complexMessages);
  });
});
