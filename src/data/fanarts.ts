export type Fanart = {
  imagePath: string;
  postedAt: string;
  author?: string;
  relatedUrl?: string;
  tags: string[];
  sensitive?: boolean;
};

// MEMO: 新しい物ほど上に追加していくこと
// MEMO: 成人向けなどのセンシティブな画像には sensitive: true を付けること。
//       付けた画像はグリッドでブラー表示され、解除ボタン押下で表示される。
export const fanarts: Fanart[] = [
  {
    imagePath: "../otegaki/20260717_HNb1eRCbQAAB8UY.png",
    postedAt: "2026-07-17",
    author: "アマクサモドキ",
    relatedUrl: "https://x.com/ylotlalSsulc7lI/status/2078118188685136368",
    tags: ["X"],
    sensitive: true,
  },
  {
    imagePath: "../otegaki/20260717_1784293104.9184f4bb1f21.webp",
    postedAt: "2026-07-17",
    tags: ["絵"],
    sensitive: true,
  },
  {
    imagePath: "../otegaki/20260713_1783927048.54434b688621.webp",
    postedAt: "2026-07-13",
    relatedUrl: "https://www.youtube.com/watch?v=radwyYhOpyQ",
    tags: ["DQ4"],
  },
  {
    imagePath: "../otegaki/20260712_1783849810.6967b0f3a849.webp",
    postedAt: "2026-07-12",
    relatedUrl: "https://www.youtube.com/watch?v=XIl0h7QG9sY",
    tags: ["DQ4"],
  },
  {
    imagePath: "../otegaki/20260707_1783422379.24416e554274.webp",
    postedAt: "2026-07-07",
    tags: ["絵"],
  },
  {
    imagePath: "../otegaki/20260707_1783422001.92794bb7b099.webp",
    postedAt: "2026-07-07",
    tags: ["絵"],
  },
  {
    imagePath: "../otegaki/20260707_1783421872.5392a3381512.webp",
    postedAt: "2026-07-07",
    tags: ["絵"],
  },
  {
    imagePath: "../otegaki/20260706_1783334293.20754b51f5ec.webp",
    postedAt: "2026-07-06",
    relatedUrl: "https://www.youtube.com/watch?v=huQN1E1-gvE",
    tags: ["DQ4"],
  },
  {
    imagePath: "../otegaki/20260706_1783333507.01514cb1a425.webp",
    postedAt: "2026-07-06",
    relatedUrl: "https://www.youtube.com/watch?v=huQN1E1-gvE",
    tags: ["DQ4"],
  },
  {
    imagePath: "../otegaki/20260704_1783170429.1589a4e49296.webp",
    postedAt: "2026-07-04",
    relatedUrl: "https://www.youtube.com/watch?v=YeJQLQrxw0Y",
    tags: ["DQ4"],
  },
];
