import type { ImageMetadata } from "astro";

export type Fanart = {
  imagePaths: string[];
  postedAt: string;
  author?: string;
  relatedUrl?: string;
  tags: string[];
  sensitive?: boolean;
  images: ImageMetadata[];
};

import data from "./fanarts.json";

const fanartGlob = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/fanart/*.{webp,png,jpg,jpeg}",
  { eager: true },
);

export const fanarts: Fanart[] = data.map((f) => {
  const images = f.imagePaths.map((path) => {
    const filename = path.replace("images/fanart/", "");
    const key = `../assets/images/fanart/${filename}`;
    return fanartGlob[key]!.default;
  });
  return { ...f, images };
});
