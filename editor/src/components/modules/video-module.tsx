import  { useEffect } from "react";
import {getQueryParams} from "@/utils";

function VideoModule() {

  const videoUrl = getQueryParams()

  useEffect(() => {
    if (!videoUrl) {
      console.warn("No video URL found. Ensure the fileUrl is passed correctly.");
    }
  }, [videoUrl]);

  console.log(videoUrl);

  return (
    <div className="w-full bg-gray-300 h-[80%] flex items-center justify-center">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-contain rounded-md"
        />
      ) : (
        <p className="text-gray-500">Loading video...</p>
      )}
    </div>
  );
}

export default VideoModule;
