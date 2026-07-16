import { useMemo, useState } from "react";
import { fanarts } from "../data/fanarts";

const isYoutubeUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.includes("youtube.com") || hostname.includes("youtu.be");
  } catch {
    return false;
  }
};

const formatDate = (date: string) => date.slice(2).replaceAll("-", ".");

const sortedFanarts = [...fanarts].sort((a, b) =>
  b.postedAt.localeCompare(a.postedAt),
);

export const OtegakiPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

      <section className="gallery-grid">
        {filteredFanarts.map((fanart) => {
          return (
            <article key={fanart.imagePath} className="fanart-card">
              <a
                className="fanart-image-link"
                href={fanart.imagePath}
                target="_blank"
                rel="noreferrer"
                aria-label="元画像を開く"
              >
                <img
                  className="fanart-image"
                  src={fanart.imagePath}
                  alt={fanart.author ?? "もげ"}
                />
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
                        className={
                          selectedTag === tag ? "tag is-active" : "tag"
                        }
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};
