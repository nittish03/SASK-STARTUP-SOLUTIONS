import { ArrowDown, ArrowUp } from "lucide-react";
import { PAGE_IMAGE_FIELDS } from "@/lib/site";
import { DESIGN_DEFAULTS } from "@/lib/defaults";
import { useContentDoc, EditorActions } from "./ContentTab";
import ImageField from "@/components/ImageField";

const COLOR_FIELDS = [
  { key: "spring", label: "Yellow accent (header, banner)" },
  { key: "bookgreen", label: "Main green (hero background)" },
  { key: "mantis", label: "Button green" },
];

const FONT_PRESETS = [
  { id: "editorial", label: "Editorial", desc: "Newsreader serif + Instrument Sans (current)" },
  { id: "classic", label: "Classic", desc: "Georgia serif + Arial" },
  { id: "modern", label: "Modern", desc: "All Helvetica — clean and plain" },
];

const BUTTON_STYLES = [
  { id: "pill", label: "Pill (current)" },
  { id: "soft", label: "Soft corners" },
  { id: "sharp", label: "Sharp corners" },
];

export default function DesignTab() {
  const { doc, form, setForm, notice, busy, saveDraft, publish, restore } = useContentDoc("design", DESIGN_DEFAULTS);

  if (form === null) return <p className="font-serif text-black/70">Loading current design settings...</p>;

  const colors = form.colors || {};
  const images = form.images || {};
  const slides = form.heroSlides || [];
  const sections = form.homeSections || [];

  const setImage = (key, v) => setForm({ ...form, images: { ...images, [key]: v } });
  const setSlide = (i, patch) => {
    const next = [...slides];
    next[i] = { ...(next[i] || {}), ...patch };
    setForm({ ...form, heroSlides: next });
  };
  const setSection = (i, patch) => {
    const next = sections.map((s, j) => (j === i ? { ...s, ...patch } : s));
    setForm({ ...form, homeSections: next });
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setForm({ ...form, homeSections: next });
  };

  return (
    <div data-testid="design-tab" className="space-y-6">
      <p className="rounded-xl bg-spring/40 px-4 py-3 font-serif text-sm text-black/80">
        Everything below shows the current live design. Save Draft → Preview Draft → Publish, and you'll be asked to confirm before anything changes.
      </p>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6">
        <h3 className="font-serif text-xl uppercase text-black">Theme Colours</h3>
        <p className="mt-1 font-serif text-sm text-black/70">Text always stays black or white for readability.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {COLOR_FIELDS.map((c) => (
            <div key={c.key}>
              <label htmlFor={`color-${c.key}`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">{c.label}</label>
              <div className="mt-1.5 flex items-center gap-2">
                <input id={`color-${c.key}`} data-testid={`color-${c.key}`} type="color"
                  value={colors[c.key] || "#000000"} onChange={(e) => setForm({ ...form, colors: { ...colors, [c.key]: e.target.value } })}
                  className="h-10 w-14 cursor-pointer rounded-lg border-2 border-black/20" />
                <span className="font-mono text-xs text-black/70">{(colors[c.key] || "").toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6">
        <h3 className="font-serif text-xl uppercase text-black">Font Preset</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {FONT_PRESETS.map((p) => (
            <button key={p.id} type="button" data-testid={`font-preset-${p.id}`}
              onClick={() => setForm({ ...form, fontPreset: p.id })} aria-pressed={(form.fontPreset || "editorial") === p.id}
              className={`rounded-xl border-2 p-4 text-left transition-colors ${
                (form.fontPreset || "editorial") === p.id ? "border-black bg-black/5" : "border-black/15 hover:border-black"
              }`}>
              <span className="block font-sans text-sm font-semibold text-black">{p.label}</span>
              <span className="mt-1 block font-serif text-xs text-black/70">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6">
        <h3 className="font-serif text-xl uppercase text-black">Button Style</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {BUTTON_STYLES.map((b) => (
            <button key={b.id} type="button" data-testid={`button-style-${b.id}`}
              onClick={() => setForm({ ...form, buttonStyle: b.id })} aria-pressed={(form.buttonStyle || "pill") === b.id}
              className={`border-2 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${
                (form.buttonStyle || "pill") === b.id ? "border-black bg-black text-white" : "border-black/25 text-black hover:border-black"
              } ${b.id === "pill" ? "rounded-full" : b.id === "soft" ? "rounded-xl" : "rounded-sm"}`}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6">
        <h3 className="font-serif text-xl uppercase text-black">Homepage Hero Slides</h3>
        <p className="mt-1 font-serif text-sm text-black/70">The three rotating images beside the main headline.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-black/10 p-4">
              <ImageField label={`Slide ${i + 1}`} value={slides[i]?.img || ""} testId={`hero-slide-${i + 1}`}
                alt={slides[i]?.alt || ""}
                onChange={(v) => setSlide(i, { img: v })}
                onAltChange={(v) => setSlide(i, { alt: v })} />
              <input value={slides[i]?.title || ""} onChange={(e) => setSlide(i, { title: e.target.value })}
                placeholder="Caption title" data-testid={`hero-slide-${i + 1}-title`}
                className="mt-3 w-full rounded-xl border-2 border-black/20 bg-transparent px-3 py-2 font-sans text-xs text-black outline-none focus:border-black" />
              <input value={slides[i]?.sub || ""} onChange={(e) => setSlide(i, { sub: e.target.value })}
                placeholder="Caption subtitle" data-testid={`hero-slide-${i + 1}-sub`}
                className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-3 py-2 font-sans text-xs text-black outline-none focus:border-black" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6" data-testid="all-page-images">
        <h3 className="font-serif text-xl uppercase text-black">All Page Images</h3>
        <p className="mt-1 font-serif text-sm text-black/70">
          Replace any photo used across the site — upload your own or paste an image link, and set its alt text. (Service block images live under Content → Services.)
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {PAGE_IMAGE_FIELDS.map((f) => (
            <ImageField key={f.key} label={f.label} value={images[f.key] || ""} testId={`img-${f.key}`}
              alt={images[`${f.key}Alt`] || ""}
              onChange={(v) => setImage(f.key, v)}
              onAltChange={(v) => setImage(`${f.key}Alt`, v)} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-black/15 bg-white p-6">
        <h3 className="font-serif text-xl uppercase text-black">Homepage Sections</h3>
        <p className="mt-1 font-serif text-sm text-black/70">Show, hide, or reorder the sections below the hero.</p>
        <ul className="mt-4 space-y-2">
          {sections.map((s, i) => (
            <li key={s.id} data-testid={`section-row-${s.id}`} className="flex items-center gap-3 rounded-xl border border-black/15 px-4 py-2.5">
              <input type="checkbox" id={`section-visible-${s.id}`} data-testid={`section-visible-${s.id}`}
                checked={!!s.visible} onChange={(e) => setSection(i, { visible: e.target.checked })}
                className="h-5 w-5 accent-black" />
              <label htmlFor={`section-visible-${s.id}`} className="flex-1 font-sans text-sm font-semibold text-black">{s.label}</label>
              <button type="button" aria-label={`Move ${s.label} up`} data-testid={`section-up-${s.id}`} onClick={() => move(i, -1)} disabled={i === 0}
                className="rounded-full border border-black/25 p-1.5 disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
              <button type="button" aria-label={`Move ${s.label} down`} data-testid={`section-down-${s.id}`} onClick={() => move(i, 1)} disabled={i === sections.length - 1}
                className="rounded-full border border-black/25 p-1.5 disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      </div>

      <EditorActions notice={notice} busy={busy} onSave={saveDraft} onPublish={publish} previewPath="/" doc={doc} onRestore={restore} />
    </div>
  );
}
