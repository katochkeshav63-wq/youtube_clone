import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import youtube from "../api/youtube";
import VideoList from "./videoList";

export default function Watch() {
  const { id } = useParams();
  const [videoRef, setVideoRef] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const fetchVideo = async () => {
    try {
      const res = await youtube.get("/videos", { // ✅ add leading slash
        params: { part: "snippet,statistics", id },
      });
      setVideoRef(res.data.items[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedVideos = async (title) => {
    try {
      const res = await youtube.get("/search", {
        params: { part: "snippet", maxResults: 20, q: title, type: "video" },
      });
      setRelatedVideos(res.data.items.filter((item) => item.id?.videoId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchVideo(); }, [id]);
  useEffect(() => { if (videoRef?.snippet?.title) fetchRelatedVideos(videoRef.snippet.title); }, [videoRef]);

  if (!videoRef) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

        <div className="flex-1">
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoRef.id}`}
              allowFullScreen
            />
          </div>

          <h2 className="mt-4 text-xl font-semibold">{videoRef.snippet.title}</h2>
          <p className="text-gray-400">{videoRef.snippet.channelTitle}</p>
        </div>

<div className="w-full lg:w-[350px] h-[500px] overflow-y-auto no-scrollbar">
  <VideoList videos={relatedVideos} />
</div>

      </div>
    </div>
  );
}