import { Button } from "@/components/ui/button";

import BackgroundModule from "../modules/background";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

function ActionBarTool() {
  return (
    <div className="bg-white rounded-md p-4 w-[350px] h-[80vh] space-y-4">
      <Button className="w-full">Export Video</Button>

      <BackgroundModule />

      <Card>
        <CardHeader>
          <CardTitle> Zoom and Pan 🤚</CardTitle>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default ActionBarTool;
