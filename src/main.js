import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const $input = document.querySelector("#input-id");
const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

const createEpisodeHTML = (episode) => {
  const $episode = `
    <div class="episode episode-${episode.number} rating-${Math.floor(episode.rating)}">${episode.rating ?? "N/A"}</div>
    `;

  return $episode;
};

const createSeasonHTML = (data, number) => {
  const season = `
    <article class="season">
      <header class="season-header">S${number}</header>
      ${data.map((episode) => createEpisodeHTML(episode)).join("")}
    </article>
    `;

  return season;
};

const App = async (id) => {
  $header.setHTMLUnsafe("");
  $episodes.setHTMLUnsafe("");
  const show = await getShowData(id);
  const seasons = await getEpisodeList(id);

  const headerHTML = show
    ? `
    <img src="${show.image}" width="214" height="299" alt="Promotional poster for the TV show '${show.name}'" class="poster">
    <h1>${show.name}</h1>
    `
    : `<p>Show not found. Please try a different ID.</p>`;

  $header.setHTMLUnsafe(headerHTML);

  if (seasons) {
    const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));
    $episodes.setHTMLUnsafe(list.join(""));
  }
};

$input.addEventListener("change", async () => {
  const newID = $input.value;
  if (newID) {
    await App(newID);
  }
});

App("83");
