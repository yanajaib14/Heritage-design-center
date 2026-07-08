export function portableTextToPlainText(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .filter((block) => block && typeof block === "object" && "children" in block)
    .map((block) => {
      const children = (block as { children?: unknown[] }).children;
      if (!Array.isArray(children)) return "";

      return children
        .filter((child) => child && typeof child === "object" && "text" in child)
        .map((child) => (child as { text?: string }).text || "")
        .join("");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
