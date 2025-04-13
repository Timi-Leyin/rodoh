import { useEffect } from "react";
import { getQueryParams } from "@/utils";
import useEditorStore from "@/store/editor.store.ts";
import MediaDisplay from "@/components/modules/video.tsx";
import ReactPlayer from "react-player";
function VideoModule() {
  const videoUrl = getQueryParams();
  const { editorBg } = useEditorStore();

  useEffect(() => {
    if (!videoUrl) {
      console.warn(
        "No video URL found. Ensure the fileUrl is passed correctly.",
      );
    }
  }, [videoUrl]);

  console.log("we are recording ");

  return (
    <div
      className={`
      w-full  h-[80%] flex items-center justify-center !rounded-lg
      ${editorBg}
    `}
    >
      <div className={"w-[95%] bg-gray-300 h-[90%] !rounded-lg"}>
        {videoUrl ? (
          <ReactPlayer
            url={videoUrl}
            className="w-full h-full object-contain rounded-md"
          />
        ) : (
          <p className="text-gray-500">Loading video...</p>
        )}
      </div>
    </div>
  );
}

export default VideoModule;
