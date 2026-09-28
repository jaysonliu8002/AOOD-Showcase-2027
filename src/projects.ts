import Papa from "papaparse";

export type Project = {
  id: string;
  title: string;
  description: string;
  authors: string[];
  tags: string[];
  url?: string;
};

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvkYlCoxRnDxEyXtDgdJyW5AS4i9yp3vpEtXAIxYsq3XJYDo95mCtZbvoV8CpNGkdpEYkq4FVDXaSf/pub?gid=1868089545&single=true&output=csv";

const splitList = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeUrl = (value = "") => {
  const url = value.trim();
  if (!url) return undefined;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export const loadProjects = async (): Promise<Project[]> => {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Couldn't load projects (HTTP ${response.status})`);
  }

  const { data } = Papa.parse<string[]>(await response.text(), {
    skipEmptyLines: "greedy",
  });

  return data
    .filter(([, title]) => title?.trim() && title.trim().toLowerCase() !== "title")
    .map(([timestamp = "", title, description = "", a1, a2, a3, a4, tags, url]) => ({
      id: `${timestamp}-${title}`,
      title: title.trim(),
      description: description.trim(),
      authors: [a1, a2, a3, a4].map((name) => name?.trim()).filter((name) => !!name),
      tags: splitList(tags),
      url: normalizeUrl(url),
    }));
};
