import {Desktop} from "@/components/layout/Desktop";
import {Screen} from "@/components/layout/Screen";
import {Taskbar} from "@/components/layout/Taskbar";

export default function DesktopPage() {
  return <Screen backgroundImage="/home-fish-bg.webp">
    <Desktop/>
    <Taskbar/>
  </Screen>;
}
