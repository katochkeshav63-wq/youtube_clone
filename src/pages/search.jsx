import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import youtube from "../api/youtube";
import VideoList from "./videoList";

export default function Search() {
  const { query } = useParams();

  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  const fetchSearchVideos = async () => {
    try {
      const decodedQuery = decodeURIComponent(query);

      const res = await youtube.get("/search", {
        params: {
          part: "snippet",
          maxResults: 10,
          q: decodedQuery,
          type: "video",
        },
      });

      const items = res.data.items.filter(
        (item) => item.id?.videoId
      );

      setVideos(items);
      setMainVideo(items[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSearchVideos();
  }, [query]);

  if (!mainVideo) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const videoId = mainVideo.id.videoId;

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        
        <div className="flex-1">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          />

          <h2 className="mt-4 text-lg font-semibold">
            {mainVideo.snippet.title}
          </h2>
        </div>

        <div className="w-full lg:w-[380px]">
          <VideoList videos={videos} setMainVideo={setMainVideo} />
        </div>

      </div>
    </div>
  );
}