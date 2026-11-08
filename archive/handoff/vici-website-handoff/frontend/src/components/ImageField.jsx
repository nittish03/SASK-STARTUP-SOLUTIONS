import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { API } from "@/lib/site";

export default function ImageField({ label, value, alt, onChange, onAltChange, testId }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", f);
      const { data } = await axios.post(`${API}/uploads`, fd, { withCredentials: true });
      onChange(data.url);
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-testid={testId}>
      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black">{label}</span>
      {value && (
        <img src={value} alt={alt || ""} className="mt-2 h-28 w-full max-w-xs rounded-xl border-2 border-black/15 object-cover" />
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-black px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white">
          <Upload className="h-3.5 w-3.5" aria-hidden="true" />
          {busy ? "Uploading..." : "Upload image"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={upload} data-testid={`${testId}-upload`} />
        </label>
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          data-testid={`${testId}-url`}
          className="min-w-0 flex-1 rounded-xl border-2 border-black/20 bg-transparent px-3 py-2 font-sans text-xs text-black outline-none focus:border-black"
        />
      </div>
      {onAltChange && (
        <input
          value={alt || ""}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Alt text (describes the image)"
          data-testid={`${testId}-alt`}
          className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-3 py-2 font-sans text-xs text-black outline-none focus:border-black"
        />
      )}
      {error && <p role="alert" className="mt-1 font-sans text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}
