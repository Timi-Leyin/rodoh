import { MicOff, Mic, Camera, CameraOff } from "lucide-react";
import DefaultCard from "@/components/modules/card.tsx";

type status = "active" | "inactive";
function MediaModule(props) {
  const mediaProps = [
    {
      icon: <Mic />,
      altIcon: <MicOff />,
      title: "Mic",
      status: "active",
    },
    {
      icon: <Camera />,
      altIcon: <CameraOff />,
      title: "Mic",
      status: "active",
    },
  ];
  return (
    <DefaultCard title={"Media"}>
      <div className={"flex items-center gap-2"}>
        {mediaProps.map((media) => {
          return (
            <div
              className={
                "border-[1px] px-2 border-gray-500/20" +
                " flex items-center justify-center h-[40px] w-[40px] rounded-md"
              }
            >
              {media.icon}
            </div>
          );
        })}
      </div>
    </DefaultCard>
  );
}

export default MediaModule;
