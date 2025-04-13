import { useEffect } from "react";
import { getQueryParams } from "@/utils";
import useEditorStore from "@/store/editor.store.ts";
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
      w-full  h-[80%] flex items-center justify-center
      ${editorBg}
    `}
    >
      <div className={"w-[90%]"}>
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
    </div>
  );
}

export default VideoModule;
