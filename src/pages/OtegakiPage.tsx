import { useEffect, useMemo, useState } from "react";
import { fanarts, fanartImageUrl } from "../data/fanarts";

const SENSITIVE_UNLOCKED_KEY = "otegaki:sensitiveUnlocked";

const isYoutubeUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.includes("youtube.com") || hostname.includes("youtu.be");
  } catch {
    return false;
  }
};

const formatDate = (date: string) => date.slice(2).replaceAll("-", ".");

type FanartCardProps = {
  fanart: (typeof fanarts)[number];
  revealed: boolean;
  selectedTag: string | null;
  onReveal: () => void;
  onSelectTag: (tag: string) => void;
};

const FanartCard = ({
  fanart,
  revealed,
  selectedTag,
  onReveal,
  onSelectTag,
}: FanartCardProps) => {
  const [broken, setBroken] = useState(false);
  const imageUrl = fanartImageUrl(fanart.imagePath);
  const locked = fanart.sensitive === true && !revealed;

  return (
    <article key={fanart.imagePath} className="fanart-card">
      <a
        className={locked ? "fanart-image-link is-locked" : "fanart-image-link"}
        href={imageUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="元画像を開く"
        onClick={locked ? (e) => e.preventDefault() : undefined}
      >
        <span className="fanart-image-wrap">
          {broken ? (
            <div className="fanart-image-broken">画像を読み込めませんでした</div>
          ) : (
            <img
              className={locked ? "fanart-image is-blurred" : "fanart-image"}
              src={imageUrl}
              alt={fanart.author ?? "もげ"}
              loading="lazy"
              onError={() => setBroken(true)}
            />
          )}
        </span>
        {locked ? (
          <div
            className="sensitive-overlay"
            onClick={(e) => e.preventDefault()}
          >
            <p className="sensitive-label">
              センシティブな内容が含まれています
            </p>
            <button
              type="button"
              className="sensitive-reveal-button"
              onClick={onReveal}
            >
              表示する
            </button>
          </div>
        ) : null}
      </a>
      <div className="fanart-body">
        <p className="fanart-meta">
          <time dateTime={fanart.postedAt}>{formatDate(fanart.postedAt)}</time>
          <span>{fanart.author ?? "もげ"}</span>
          {fanart.relatedUrl ? (
            <a
              className="meta-link-button meta-link-button-right"
              href={fanart.relatedUrl}
              target="_blank"
              rel="noreferrer"
            >
              {isYoutubeUrl(fanart.relatedUrl) ? "配信URL" : "元URL"}
            </a>
          ) : null}
        </p>
        {fanart.tags.length > 0 ? (
          <div className="fanart-tags">
            {fanart.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={selectedTag === tag ? "tag is-active" : "tag"}
                onClick={() => onSelectTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
};

const sortedFanarts = [...fanarts].sort((a, b) =>
  b.postedAt.localeCompare(a.postedAt),
);

export const OtegakiPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sensitiveUnlocked, setSensitiveUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SENSITIVE_UNLOCKED_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        SENSITIVE_UNLOCKED_KEY,
        sensitiveUnlocked ? "true" : "false",
      );
    } catch {
      // localStorage が利用できない環境では無視する
    }
  }, [sensitiveUnlocked]);

  const tags = useMemo(
    () =>
      Array.from(new Set(sortedFanarts.flatMap((fanart) => fanart.tags))).sort(
        (a, b) => a.localeCompare(b, "ja"),
      ),
    [],
  );

  const filteredFanarts = useMemo(() => {
    if (!selectedTag) {
      return sortedFanarts;
    }

    return sortedFanarts.filter((fanart) => fanart.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <main className="gallery-page">
      <header className="page-header">
        <h1>おてがき</h1>
      </header>

      <div className="filter-bar" aria-label="フィルター">
        {sortedFanarts.some((fanart) => fanart.sensitive) ? (
          <button
            type="button"
            className={
              sensitiveUnlocked
                ? "sensitive-toggle is-checked"
                : "sensitive-toggle"
            }
            aria-pressed={sensitiveUnlocked}
            onClick={() => setSensitiveUnlocked((prev) => !prev)}
          >
            センシティブな画像を表示
          </button>
        ) : null}
        {sortedFanarts.some((fanart) => fanart.sensitive) && tags.length > 0 ? (
          <span className="filter-divider" aria-hidden="true">
            ｜
          </span>
        ) : null}
        {tags.length > 0 ? (
          <div className="tag-filter" aria-label="タグで絞り込み">
            <button
              type="button"
              className={!selectedTag ? "tag is-active" : "tag"}
              onClick={() => setSelectedTag(null)}
            >
              すべて
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={selectedTag === tag ? "tag is-active" : "tag"}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <section className="gallery-grid">
        {filteredFanarts.map((fanart) => {
          const isSensitive = fanart.sensitive === true;
          const revealed = isSensitive && sensitiveUnlocked;
          return (
            <FanartCard
              key={fanart.imagePath}
              fanart={fanart}
              revealed={revealed}
              selectedTag={selectedTag}
              onReveal={() => setSensitiveUnlocked(true)}
              onSelectTag={setSelectedTag}
            />
          );
        })}
      </section>
    </main>
  );
};
