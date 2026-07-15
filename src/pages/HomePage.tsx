import { topImagePath } from "../data/site";

export const HomePage = () => (
  <main className="home-page">
    <a href="./otegaki/">
      <img className="hero-image" src={topImagePath} alt="" />
    </a>
  </main>
);
