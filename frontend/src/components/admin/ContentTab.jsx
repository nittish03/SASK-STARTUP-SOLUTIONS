import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Save, UploadCloud, Eye, History } from "lucide-react";
import { API, SERVICES } from "@/lib/site";
import { CONTENT_DEFAULTS } from "@/lib/defaults";
import ImageField from "@/components/ImageField";

export function useContentDoc(key, defaults = {}) {
  const [doc, setDoc] = useState(null);
  const [form, setForm] = useState(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    axios.get(`${API}/admin/content/${key}`, { withCredentials: true })
      .then((r) => {
        setDoc(r.data);
        setForm({ ...defaults, ...(r.data.draft || r.data.published || {}) });
      })
      .catch(() => {
        setDoc({ draft: null, published: null, revisions: [] });
        setForm({ ...defaults });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(load, [load]);

  const call = async (fn, msg) => {
    setBusy(true);
    setNotice("");
    try {
      await fn();
      setNotice(msg);
      load();
    } catch (e) {
      setNotice(e.response?.data?.detail || "Action failed");
    } finally {
      setBusy(false);
    }
  };

  return {
    doc, form, setForm, notice, busy,
    saveDraft: () => call(() => axios.put(`${API}/admin/content/${key}/draft`, form, { withCredentials: true }), "Draft saved (not live yet)."),
    publish: () => call(async () => {
      await axios.put(`${API}/admin/content/${key}/draft`, form, { withCredentials: true });
      await axios.post(`${API}/admin/content/${key}/publish`, {}, { withCredentials: true });
    }, "Published — live on the website."),
    restore: (i) => call(() => axios.post(`${API}/admin/content/${key}/restore/${i}`, {}, { withCredentials: true }), "Revision restored into the draft — publish to make it live."),
  };
}

export function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function setPath(obj, path, value) {
  const keys = path.split(".");
  const next = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = next;
  keys.slice(0, -1).forEach((k) => {
    cur[k] = Array.isArray(cur[k]) ? [...cur[k]] : { ...(cur[k] || {}) };
    cur = cur[k];
  });
  cur[keys[keys.length - 1]] = value;
  return next;
}

function confirmThen(fn, message) {
  return () => {
    if (window.confirm(message)) fn();
  };
}

export function EditorActions({ notice, busy, onSave, onPublish, previewPath, doc, onRestore }) {
  return (
    <div className="mt-6 border-t-2 border-black/10 pt-5">
      {notice && <p role="status" data-testid="editor-notice" className="mb-3 rounded-xl bg-mantis/30 px-4 py-2.5 font-sans text-sm font-semibold text-black">{notice}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" data-testid="editor-save-draft-btn" onClick={confirmThen(onSave, "Save these changes as a draft? (Not live yet)")} disabled={busy}
          className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white disabled:opacity-40">
          <Save className="h-4 w-4" aria-hidden="true" /> Save Draft
        </button>
        <button type="button" data-testid="editor-publish-btn" onClick={confirmThen(onPublish, "Publish these changes LIVE to the website?")} disabled={busy}
          className="inline-flex items-center gap-2 rounded-full bg-mantis px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-transform hover:scale-105 disabled:opacity-40">
          <UploadCloud className="h-4 w-4" aria-hidden="true" /> Publish
        </button>
        <a href={`${previewPath}?preview=1`} target="_blank" rel="noopener noreferrer" data-testid="editor-preview-btn"
          className="inline-flex items-center gap-2 rounded-full border-2 border-black/25 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:border-black">
          <Eye className="h-4 w-4" aria-hidden="true" /> Preview Draft
        </a>
      </div>
      {doc?.revisions?.length > 0 && (
        <div className="mt-5">
          <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
            <History className="h-4 w-4" aria-hidden="true" /> Previous published versions
          </p>
          <ul className="mt-2 space-y-2">
            {doc.revisions.map((rev, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-black/15 bg-white px-4 py-2.5">
                <span className="font-sans text-xs text-black/70">Version from {new Date(rev.saved_at).toLocaleString()}</span>
                <button type="button" data-testid={`editor-restore-${i}`} onClick={confirmThen(() => onRestore(i), "Restore this older version into your draft?")}
                  className="rounded-full border-2 border-black px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white">
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "services", label: "Services", path: "/services" },
  { key: "staff", label: "Staff", path: "/staff" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "footer", label: "Footer", path: "/" },
];

function fieldsFor(key) {
  switch (key) {
    case "home":
      return [
        { key: "heroLine1", label: "Hero headline — line 1" },
        { key: "heroLine2", label: "Hero headline — line 2" },
        { key: "heroLine3", label: "Hero headline — line 3" },
        { key: "heroPara1", label: "Hero paragraph 1", type: "textarea" },
        { key: "heroPara2", label: "Hero paragraph 2", type: "textarea" },
        { key: "heroCallout", label: "Call-out text (highlight bar)", type: "textarea" },
        { key: "heroBtn", label: "Hero button text" },
        { key: "featuredHeading", label: "Featured Services heading" },
        { key: "carouselHeading", label: "Carousel section heading" },
        { key: "carouselText", label: "Carousel section intro", type: "textarea" },
        { key: "galleryHeading", label: "Gallery heading" },
        { key: "patrickHeading", label: "Meet the Founder heading" },
        { key: "patrickText", label: "Meet the Founder text", type: "textarea" },
        { key: "storyHeading", label: "Brand Story heading" },
        { key: "storyText", label: "Brand Story points (one per line: Title | Text)", type: "textarea" },
        { key: "story2Text", label: "Brand Story second line" },
        { key: "story2Btn", label: "Brand Story button text" },
      ];
    case "services":
      return [
        { key: "intro", label: "Intro paragraph", type: "textarea" },
        { key: "closingHeading", label: "Closing heading" },
        { key: "closingText", label: "Closing text", type: "textarea" },
        ...SERVICES.flatMap((s) => [
          { key: `items.${s.slug}.paragraphs`, label: `${s.detailTitle} — description (blank line = new paragraph)`, type: "textarea" },
          { key: `items.${s.slug}.img`, label: `${s.detailTitle} — image`, type: "image" },
          { key: `items.${s.slug}.price`, label: `${s.detailTitle} — price label (optional; hidden if empty)` },
        ]),
      ];
    case "staff":
      return [
        { key: "staffName", label: "Name" },
        { key: "staffRole", label: "Role label (e.g. Founder)" },
        { key: "staffTitle", label: "Title line" },
        { key: "staffBio", label: "Bio", type: "textarea" },
        { key: "staffPhoto", label: "Photo", type: "image" },
      ];
    case "contact":
      return [
        { key: "phone", label: "Phone number" },
        { key: "email", label: "Email address" },
        { key: "address1", label: "Address line 1" },
        { key: "address2", label: "Address line 2" },
        { key: "address3", label: "Address line 3" },
        { key: "hoursLabel", label: "Hours — days" },
        { key: "hoursTime", label: "Hours — times" },
        { key: "formHeading", label: "Contact form heading" },
        { key: "formIntro", label: "Contact form intro", type: "textarea" },
      ];
    case "footer":
      return [{ key: "footerBlurb", label: "Footer description", type: "textarea" }];
    default:
      return [];
  }
}

export default function ContentTab() {
  const [page, setPage] = useState("home");
  const { doc, form, setForm, notice, busy, saveDraft, publish, restore } = useContentDoc(page, CONTENT_DEFAULTS[page] || {});
  const fields = fieldsFor(page);
  const current = PAGES.find((p) => p.key === page);

  return (
    <div data-testid="content-tab">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose page to edit">
        {PAGES.map((p) => (
          <button key={p.key} type="button" data-testid={`content-page-${p.key}`} onClick={() => setPage(p.key)}
            aria-pressed={page === p.key}
            className={`rounded-full border-2 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${
              page === p.key ? "border-black bg-black text-white" : "border-black/20 bg-white text-black hover:border-black"
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      {form === null ? (
        <p className="mt-6 font-serif text-black/70">Loading current content...</p>
      ) : (
        <div className="mt-6 rounded-2xl border-2 border-black/15 bg-white p-6">
          <h3 className="font-serif text-xl uppercase text-black">Edit: {current.label}</h3>
          <p className="mt-1 font-serif text-sm text-black/70">
            Fields below show the current live content. Edit what you need, then Save Draft → Preview Draft → Publish. You'll be asked to confirm before anything is saved.
          </p>
          <div className="mt-5 space-y-5">
            {fields.map((f) => {
              const value = getPath(form, f.key) ?? "";
              if (f.type === "image") {
                return (
                  <ImageField key={f.key} label={f.label} value={value} testId={`field-${f.key.replace(/\./g, "-")}`}
                    alt={getPath(form, `${f.key}Alt`) ?? ""}
                    onChange={(v) => setForm(setPath(form, f.key, v))}
                    onAltChange={(v) => setForm(setPath(form, `${f.key}Alt`, v))} />
                );
              }
              return (
                <div key={f.key}>
                  <label htmlFor={`field-${f.key}`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea id={`field-${f.key}`} data-testid={`field-${f.key.replace(/\./g, "-")}`} rows={4} value={value}
                      onChange={(e) => setForm(setPath(form, f.key, e.target.value))}
                      className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-serif text-sm text-black outline-none focus:border-black" />
                  ) : (
                    <input id={`field-${f.key}`} data-testid={`field-${f.key.replace(/\./g, "-")}`} value={value}
                      onChange={(e) => setForm(setPath(form, f.key, e.target.value))}
                      className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-sans text-sm text-black outline-none focus:border-black" />
                  )}
                </div>
              );
            })}
          </div>
          <EditorActions notice={notice} busy={busy} onSave={saveDraft} onPublish={publish}
            previewPath={current.path} doc={doc} onRestore={restore} />
        </div>
      )}
    </div>
  );
}
