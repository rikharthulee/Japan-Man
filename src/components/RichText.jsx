export default function RichText({ value }) {
  if (!value) return null;

  const paras = extractParagraphs(value);
  if (paras.length === 0) return null;

  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className={`text-lg leading-relaxed ${i === 0 ? "mt-0" : "mt-3"}`}>
          {p}
        </p>
      ))}
    </>
  );
}

function extractParagraphs(value) {
  try {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) {
      // Array of strings or nodes
      const out = [];
      value.forEach((v) => {
        if (typeof v === "string") out.push(v);
        else if (v && typeof v === "object") out.push(flattenNode(v));
      });
      return out.filter(Boolean);
    }
    if (value && typeof value === "object") {
      // Basic ProseMirror/TipTap doc shape
      if (value.type === "doc" && Array.isArray(value.content)) {
        return value.content
          .filter((n) => n && n.type === "paragraph")
          .map((p) => flattenNode(p))
          .filter(Boolean);
      }
      // Single paragraph node
      if (value.type === "paragraph") {
        return [flattenNode(value)].filter(Boolean);
      }
    }
  } catch {}
  return [];
}

function flattenNode(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  const parts = [];
  const walk = (n) => {
    if (!n) return;
    if (typeof n === "string") {
      parts.push(n);
      return;
    }
    if (n.text) parts.push(n.text);
    if (Array.isArray(n.content)) n.content.forEach(walk);
  };
  walk(node);
  return parts.join("").trim();
}

