import { useEffect, useState } from "react";
import youtube from "../api/youtube";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchTrendingVideos = async () => {
    try {
      const res = await youtube.get("/videos", {
        params: {
          part: "snippet,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 80,
        },
      });

      setVideos(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => navigate(`/watch/${video.id}`)}
              className="cursor-pointer group"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full rounded-xl"
              />

              <div className="mt-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {video.snippet.title}
                </h3>

                <p className="text-gray-400 text-xs">
                  {video.snippet.channelTitle}
                </p>

                <p className="text-gray-500 text-xs">
                  {Number(video.statistics.viewCount).toLocaleString()} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}