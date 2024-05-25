export const tubeApi = async (id) => {
  const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE;
  const fetchData = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet`
  );
  const dataToJson = await fetchData.json();
  if (dataToJson.items.length === 0) {
    return;
  }

  const img = dataToJson.items[0].snippet.thumbnails.maxres.url;
  const title = dataToJson.items[0].snippet.title;
  const description = dataToJson.items[0].snippet.description;

  return { img, title, description };
};
