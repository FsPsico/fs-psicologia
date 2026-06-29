// Small shared helpers for the blog.

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

/** Human date in pt-BR, e.g. "29 de junho de 2026". */
export function formatDate(date: Date): string {
  return DATE_FMT.format(date);
}

/** ISO date (YYYY-MM-DD) for <time datetime> and JSON-LD. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Estimated reading time in minutes (~200 words/min, pt-BR reading pace). */
export function readingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ') // strip code blocks
    .replace(/<[^>]+>/g, ' ') // strip html
    .replace(/[#>*_`~\-!\[\]()]/g, ' '); // strip md punctuation
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
