import type { ImageMetadata } from "astro";

export type Fanart = {
  filenames: string[];
  postedAt: string;
  author?: string;
  relatedUrl?: string;
  tags: string[];
  sensitive?: boolean;
  images: ImageMetadata[];
};

import data from "./fanarts.json";

const fanartGlob = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/fanart/*.{webp,gif,png,jpg,jpeg}",
  { eager: true },
);

export const fanarts: Fanart[] = data.map((f) => {
  const images = f.filenames.map((name) => {
    const key = `../assets/images/fanart/${name}`;
    return fanartGlob[key]!.default;
  });
  return { ...f, images };
});
