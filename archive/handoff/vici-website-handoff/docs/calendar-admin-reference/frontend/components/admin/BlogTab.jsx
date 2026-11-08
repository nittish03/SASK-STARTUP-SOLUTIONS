import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Eye, UploadCloud, EyeOff, ArrowLeft } from "lucide-react";
import { API } from "@/lib/site";
import ImageField from "@/components/ImageField";
import Markdown from "@/components/Markdown";

const EMPTY = {
  title: "", slug: "", content: "", seo_title: "", seo_description: "",
  featured_image: "", featured_alt: "", author: "Patrick Vachon",
};

function apiError(err) {
  const detail = err.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || "").filter(Boolean).join(" ");
  return "Something went wrong.";
}

export default function BlogTab() {
  const [posts, setPosts] = useState(null);
  const [editing, setEditing] = useState(null); // null=list, {}=editor
  const [notice, setNotice] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    axios.get(`${API}/admin/blog`, { withCredentials: true }).then((r) => setPosts(r.data)).catch(() => setPosts([]));
  }, []);
  useEffect(load, [load]);

  const run = async (fn, msg) => {
    setBusy(true);
    setNotice("");
    try {
      await fn();
      setNotice(msg);
      load();
    } catch (e) {
      setNotice(apiError(e));
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!editing.title.trim()) {
      setNotice("A title is required.");
      return;
    }
    if (!window.confirm(editing.id ? "Save changes to this post draft?" : "Save this new post as a draft?")) return;
    await run(async () => {
      if (editing.id) {
        const { data } = await axios.put(`${API}/admin/blog/${editing.id}`, editing, { withCredentials: true });
        setEditing(data);
      } else {
        const { data } = await axios.post(`${API}/admin/blog`, editing, { withCredentials: true });
        setEditing(data);
      }
    }, "Draft saved.");
  };

  const publish = async () => {
    if (!editing.title.trim()) {
      setNotice("A title is required.");
      return;
    }
    if (!window.confirm("Publish this post LIVE to /blog?")) return;
    await run(async () => {
      if (editing.id) {
        const { data } = await axios.put(`${API}/admin/blog/${editing.id}`, editing, { withCredentials: true });
        setEditing(data);
      } else {
        const { data } = await axios.post(`${API}/admin/blog`, editing, { withCredentials: true });
        setEditing(data);
      }
    }, "Draft saved.");
    setBusy(true);
    try {
      const { data: list } = await axios.get(`${API}/admin/blog`, { withCredentials: true });
      const mine = list.find((p) => p.title === editing.title) || {};
      const id = editing.id || mine.id;
      await axios.post(`${API}/admin/blog/${id}/publish`, {}, { withCredentials: true });
      setNotice("Published — live at /blog.");
      setEditing((e) => ({ ...e, id, status: "published" }));
      load();
    } catch (e) {
      setNotice(apiError(e));
    } finally {
      setBusy(false);
    }
  };

  if (posts === null) return <p className="font-serif text-black/70">Loading posts...</p>;

  if (!editing) {
    return (
      <div data-testid="blog-list">
        {notice && <p role="status" className="mb-4 rounded-xl bg-mantis/30 px-4 py-2.5 font-sans text-sm font-semibold text-black">{notice}</p>}
        <button type="button" data-testid="blog-new-btn" onClick={() => { setEditing({ ...EMPTY }); setNotice(""); }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-mantis px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-transform hover:scale-105">
          <Plus className="h-4 w-4" aria-hidden="true" /> New Post
        </button>
        {!posts.length ? (
          <p data-testid="blog-empty" className="font-serif text-black/70">No posts yet. Write your first one.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} data-testid={`blog-row-${p.slug}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-black/15 bg-white p-5">
                <div>
                  <p className="font-sans text-base font-semibold text-black">{p.title}</p>
                  <p className="mt-0.5 font-sans text-xs text-black/60">
                    /blog/{p.slug} · {p.author}{p.published_at ? ` · published ${new Date(p.published_at).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest ${
                    p.status === "published" ? "bg-mantis text-black" : "bg-black/10 text-black"
                  }`}>{p.status}</span>
                  {p.status === "published" && (
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" data-testid={`blog-view-${p.slug}`} aria-label="View post"
                      className="rounded-full border-2 border-black/25 p-2 text-black hover:border-black"><Eye className="h-4 w-4" /></a>
                  )}
                  <button type="button" data-testid={`blog-edit-${p.slug}`} aria-label={`Edit ${p.title}`}
                    onClick={() => { setEditing({ ...EMPTY, ...p }); setNotice(""); }}
                    className="rounded-full border-2 border-black/25 p-2 text-black hover:border-black"><Pencil className="h-4 w-4" /></button>
                  {p.status === "published" ? (
                    <button type="button" data-testid={`blog-unpublish-${p.slug}`} aria-label={`Unpublish ${p.title}`}
                      onClick={() => run(() => axios.post(`${API}/admin/blog/${p.id}/unpublish`, {}, { withCredentials: true }), "Unpublished — now a private draft.")}
                      className="rounded-full border-2 border-black/25 p-2 text-black hover:border-black"><EyeOff className="h-4 w-4" /></button>
                  ) : null}
                  <button type="button" data-testid={`blog-delete-${p.slug}`} aria-label={`Delete ${p.title}`}
                    onClick={() => { if (window.confirm(`Delete "${p.title}" permanently?`)) run(() => axios.delete(`${API}/admin/blog/${p.id}`, { withCredentials: true }), "Post deleted."); }}
                    className="rounded-full border-2 border-red-700 p-2 text-red-700 hover:bg-red-700 hover:text-white"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div data-testid="blog-editor" className="rounded-2xl border-2 border-black/15 bg-white p-6">
      <button type="button" data-testid="blog-back-btn" onClick={() => { setEditing(null); setNotice(""); setShowPreview(false); }}
        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-black underline underline-offset-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
      </button>
      {notice && <p role="status" data-testid="blog-editor-notice" className="mt-3 rounded-xl bg-mantis/30 px-4 py-2.5 font-sans text-sm font-semibold text-black">{notice}</p>}

      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="post-title" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Title</label>
          <input id="post-title" data-testid="post-title-input" value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-sans text-base text-black outline-none focus:border-black" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="post-slug" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">URL slug</label>
            <input id="post-slug" data-testid="post-slug-input" value={editing.slug} placeholder="auto-from-title"
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-mono text-sm text-black outline-none focus:border-black" />
          </div>
          <div>
            <label htmlFor="post-author" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Author</label>
            <input id="post-author" data-testid="post-author-input" value={editing.author}
              onChange={(e) => setEditing({ ...editing, author: e.target.value })}
              className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-sans text-sm text-black outline-none focus:border-black" />
          </div>
        </div>
        <ImageField label="Featured image" value={editing.featured_image} testId="post-featured"
          alt={editing.featured_alt}
          onChange={(v) => setEditing({ ...editing, featured_image: v })}
          onAltChange={(v) => setEditing({ ...editing, featured_alt: v })} />
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="post-content" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Content</label>
            <button type="button" data-testid="post-preview-toggle" onClick={() => setShowPreview((v) => !v)}
              className="font-sans text-xs font-semibold uppercase tracking-wide text-black underline underline-offset-4">
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
          <p className="mt-1 font-serif text-xs italic text-black/60">
            Formatting: ## Heading, **bold**, *italic*, [link text](https://…), ![alt](image-url). Blank line = new paragraph.
          </p>
          {showPreview ? (
            <Markdown text={editing.content} className="mt-2 min-h-40 rounded-xl border-2 border-black/20 p-4 font-serif text-base leading-relaxed text-black/85 [&_a]:underline [&_h2]:mt-6 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-bold [&_h3]:font-sans [&_h3]:font-bold [&_img]:my-4 [&_img]:rounded-2xl [&_p]:mt-3" />
          ) : (
            <textarea id="post-content" data-testid="post-content-input" rows={12} value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-mono text-sm text-black outline-none focus:border-black" />
          )}
        </div>
        <div>
          <label htmlFor="post-seo-title" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">SEO title (optional)</label>
          <input id="post-seo-title" data-testid="post-seo-title-input" value={editing.seo_title}
            onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })}
            className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-sans text-sm text-black outline-none focus:border-black" />
        </div>
        <div>
          <label htmlFor="post-seo-desc" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">SEO meta description (optional)</label>
          <textarea id="post-seo-desc" data-testid="post-seo-desc-input" rows={2} value={editing.seo_description}
            onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })}
            className="mt-1.5 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-serif text-sm text-black outline-none focus:border-black" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" data-testid="post-save-btn" onClick={save} disabled={busy}
          className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white disabled:opacity-40">
          Save Draft
        </button>
        {editing.status === "published" ? (
          <button type="button" data-testid="post-unpublish-btn" disabled={busy}
            onClick={() => run(() => axios.post(`${API}/admin/blog/${editing.id}/unpublish`, {}, { withCredentials: true }).then(() => setEditing((e) => ({ ...e, status: "draft" }))), "Unpublished — now a private draft.")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white disabled:opacity-40">
            <EyeOff className="h-4 w-4" aria-hidden="true" /> Unpublish
          </button>
        ) : (
          <button type="button" data-testid="post-publish-btn" onClick={publish} disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-mantis px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-transform hover:scale-105 disabled:opacity-40">
            <UploadCloud className="h-4 w-4" aria-hidden="true" /> Publish
          </button>
        )}
      </div>
    </div>
  );
}
