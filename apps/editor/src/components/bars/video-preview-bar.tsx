import VideoModule from "@/components/modules/video-module.tsx";
import VideoSliceModule from "@/components/modules/video-slice-module.tsx";

function VideoPreviewBar(props) {
  return (
    <div className={"bg-white rounded-md p-4 h-[80vh]"}>
      <VideoModule />
      <VideoSliceModule />
    </div>
  );
}

export default VideoPreviewBar;
