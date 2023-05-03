import NavBar from "@/src/components/NavBar/NavBar";
import About from "@/src/components/About/About";
import CashMachine from "@/src/components/Cash Machine/CashMachine";
import Description from "@/src/components/Description/Description";
import Notification from "@/src/components/UI/Notification";
import Petition from "@/src/components/Petition/Petition";
import Safe from "@/src/components/Safe/Safe";
import Tips from "@/src/components/UI/Tips";
import { useEffect } from "react";
import { useScrollAnchors } from "@/src/hooks/use-scroll-anchors";

export default function Home() {
  useScrollAnchors(["connect_wallet", "petition", "safe", "cash_machine"]);
  return (
    <div className="wrapper">
      <Tips />
      <NavBar />
      <About />
      <Petition />
      <Safe />
      <CashMachine />
      <Description />
      <Notification />
    </div>
  );
}
