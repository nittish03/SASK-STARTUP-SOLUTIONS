import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./site";

export function isPreviewMode() {
  return new URLSearchParams(window.location.search).has("preview");
}

export function useContent(key) {
  const [data, setData] = useState({});
  useEffect(() => {
    const url = isPreviewMode() ? `${API}/content/${key}/draft` : `${API}/content/${key}`;
    axios.get(url, { withCredentials: true })
      .then((r) => setData(r.data?.data || {}))
      .catch(() => {});
  }, [key]);
  return data;
}
