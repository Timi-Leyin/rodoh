import { useEffect, useState } from "react";
import useEditorStore from "@/store/editor.store.ts";
import ReactPlayer from "react-player";

function VideoModule() {
  const { editorBg } = useEditorStore();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!videoUrl) {
      console.warn("No video URL found. Ensure the fileUrl is passed correctly.");
    }
  }, [videoUrl]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div
      className={`
      w-full h-[80%] flex flex-col items-center justify-center !rounded-lg
      ${editorBg}
    `}
    >
      <div className="w-[90%] h-[90%]  !rounded-lg flex items-center justify-center relative">
        {videoUrl ? (
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          />
        ) : (
          <p className="text-gray-500">No video loaded. Upload a video to start.</p>
        )}
      </div>


      <div className="mt-4">
        <label
          htmlFor="video-upload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload Video
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default VideoModule;
