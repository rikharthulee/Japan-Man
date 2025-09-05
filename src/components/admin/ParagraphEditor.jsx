"use client";
import { useEffect, useMemo, useState } from "react";

function toParagraphs(value) {
  try {
    if (!value) return [];
    if (typeof value === "string") return value.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    if (typeof value === "object") {
      if (value.type === "doc" && Array.isArray(value.content)) {
        return value.content
          .filter((n) => n?.type === "paragraph")
          .map((p) => flattenNode(p))
          .filter(Boolean);
      }
      if (value.type === "paragraph") return [flattenNode(value)].filter(Boolean);
    }
  } catch {}
  return [];
}

function flattenNode(node) {
  const parts = [];
  const walk = (n) => {
    if (!n) return;
    if (typeof n === "string") parts.push(n);
    if (n.text) parts.push(n.text);
    if (Array.isArray(n.content)) n.content.forEach(walk);
  };
  walk(node);
  return parts.join("").trim();
}

function fromParagraphsToDoc(paras) {
  return {
    type: "doc",
    content: paras.map((t) => ({
      type: "paragraph",
      content: t ? [{ type: "text", text: t }] : [],
    })),
  };
}

export default function ParagraphEditor({ value, onChange, label = "Body" }) {
  const initialText = useMemo(() => toParagraphs(value).join("\n\n"), [value]);
  const [text, setText] = useState(initialText);

  // Keep local state in sync if parent value changes (edit mode switching rows)
  useEffect(() => setText(initialText), [initialText]);

  useEffect(() => {
    const paras = text
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    onChange?.(fromParagraphsToDoc(paras));
  }, [text, onChange]);

  const parasPreview = useMemo(
    () => text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
    [text]
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        className="w-full min-h-40 rounded border p-2 font-[inherit]"
        placeholder="Write paragraphs here. Leave a blank line between paragraphs."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="space-y-2">
        <div className="text-xs text-neutral-500">Preview</div>
        <div className="prose max-w-none">
          {parasPreview.map((p, i) => (
            <p
              key={i}
              style={{ textIndent: "1.5em" }}
              className={`text-base leading-relaxed ${i === 0 ? "mt-0" : "mt-3"}`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

