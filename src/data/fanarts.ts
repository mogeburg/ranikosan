import type { ImageMetadata } from "astro";

export type Fanart = {
  imagePath: string;
  postedAt: string;
  author?: string;
  relatedUrl?: string;
  tags: string[];
  sensitive?: boolean;
  image: ImageMetadata;
};

import data from "./fanarts.json";

const fanartGlob = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/fanart/*.{webp,png}",
  { eager: true },
);

export const fanarts: Fanart[] = data.map((f) => {
  const filename = f.imagePath.replace("images/fanart/", "");
  const key = `../assets/images/fanart/${filename}`;
  const image = fanartGlob[key]!.default;
  return { ...f, image };
});
