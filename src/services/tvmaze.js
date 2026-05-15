const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";
const API_URL = "https://api.tvmaze.com/shows/";

const getShowData = async (id) => {
  const URL = `${API_URL}${id}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();

    return {
      name: data.name,
      rating: data.rating,
      image: data.image?.medium ?? PLACEHOLDER_IMAGE,
    };
  } catch (error) {
    console.error(`GET ${URL} ${error}`);
  }
};

const getEpisodeList = async (id) => {
  const URL = `${API_URL}${id}/episodes`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const episodes = await response.json();
    const episodeList = episodes.map((episode) => ({
      number: episode.number,
      season: episode.season,
      rating: episode.rating.average,
    }));

    const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);

    return episodesBySeason;
  } catch (error) {
    console.error(`GET ${URL} ${error}`);
  }
};

export { getShowData, getEpisodeList };
