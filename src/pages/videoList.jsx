import { useNavigate } from "react-router-dom";

export default function VideoList({ videos = [], setMainVideo }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {videos.map((video, index) => {
        // ❌ Handle both /search and /videos
        const videoId = video?.id?.videoId || (typeof video?.id === "string" ? video.id : null);
        if (!videoId) return null;

        // ❌ Optional chaining for thumbnails
        const thumbnail =
          video?.snippet?.thumbnails?.medium?.url ||
          video?.snippet?.thumbnails?.default?.url ||
          "";

        if (!thumbnail) return null; // skip if no thumbnail

        const title = video?.snippet?.title || "No Title";
        const channel = video?.snippet?.channelTitle || "Unknown Channel";

        return (
          <div
            key={videoId || index}
            onClick={() => {
              navigate(`/watch/${videoId}`);
              if (setMainVideo) setMainVideo(video);
            }}
            className="flex gap-3 cursor-pointer hover:bg-[#1f1f1f] p-2 rounded-lg"
          >
            <img
              src={thumbnail}
              alt={title}
              className="w-[150px] h-[90px] object-cover rounded-lg"
            />

            <div>
              <h4 className="text-sm line-clamp-2">{title}</h4>
              <p className="text-xs text-gray-400">{channel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}