import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
function IndexHeader(props) {
  return (
    <div
      className={
        "bg-white w-full mb-2 py-2 px-4 flex items-center justify-between"
      }
    >
      <img
        src={"/logo/16.png"}
        alt={"logo"}
        width={50}
        height={50}
        className={"rounded-md"}
      />

      <Button>
        {" "}
        <Share /> Export Video
      </Button>
    </div>
  );
}

export default IndexHeader;
