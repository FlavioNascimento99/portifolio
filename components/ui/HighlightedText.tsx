import React from "react";
import { Highlighter } from "./Highlighter";

interface HighlightWord {
  word: string;
  action?: "highlight" | "underline" | "box" | "circle";
  color?: string;
}

interface HighlightedTextProps {
  text: string;
  words: HighlightWord[];
  className?: string;
}

export function HighlightedText({ text, words, className }: HighlightedTextProps) {
  const pattern = new RegExp(
    `(${words.map(w => w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = words.find(w => w.word.toLowerCase() === part.toLowerCase());
        if (match) {
          return (
            <Highlighter
              key={i}
              action={match.action ?? "highlight"}
              color={match.color ?? "#ffd1dc"}
              isView
            >
              {part}
            </Highlighter>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
