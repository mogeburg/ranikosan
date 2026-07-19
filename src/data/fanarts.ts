export type Fanart = {
  imagePath: string;
  postedAt: string;
  author?: string;
  relatedUrl?: string;
  tags: string[];
  sensitive?: boolean;
};

import data from "./fanarts.json";
export const fanarts: Fanart[] = data;
