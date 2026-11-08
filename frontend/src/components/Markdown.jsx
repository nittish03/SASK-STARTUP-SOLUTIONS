import { useMemo } from "react";

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  return s
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2" loading="lazy" decoding="async" />')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) =>
      u.startsWith("http")
        ? `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`
        : `<a href="${u}">${t}</a>`
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderBlock(b) {
  const lines = b.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim());

  if (lines.every((l) => l.trim().startsWith("|"))) {
    const rows = lines.map((l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim()));
    const [head, , ...body] = rows;
    return `<table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${body
      .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`;
  }
  if (lines.every((l) => l.trim().startsWith("- "))) {
    return `<ul>${lines.map((l) => `<li>${inline(l.trim().slice(2))}</li>`).join("")}</ul>`;
  }
  if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
    return `<ol>${lines.map((l) => `<li>${inline(l.trim().replace(/^\d+\.\s/, ""))}</li>`).join("")}</ol>`;
  }
  if (b.startsWith("### ")) return `<h3>${inline(b.slice(4))}</h3>`;
  if (b.startsWith("## ")) return `<h2>${inline(b.slice(3))}</h2>`;
  if (b.startsWith("# ")) return `<h2>${inline(b.slice(2))}</h2>`;
  return `<p>${inline(b).replace(/\n/g, "<br />")}</p>`;
}

export function mdToHtml(md) {
  const esc = escapeHtml(md || "");
  return esc
    .split(/\n{2,}/)
    .map((block) => renderBlock(block.trim()))
    .filter(Boolean)
    .join("");
}

export default function Markdown({ text, className = "" }) {
  const html = useMemo(() => mdToHtml(text), [text]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
