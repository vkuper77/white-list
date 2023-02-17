import About from "@/src/components/About/About";
import CashMachine from "@/src/components/Cash Machine/CashMachine";
import Description from "@/src/components/Description/Description";
import Form from "@/src/components/Form/Form";
import NavBar from "@/src/components/NavBar/NavBar";
import Notification from "@/src/components/UI/Notification";
import Petition from "@/src/components/Petition/Petition";
import Safe from "@/src/components/Safe/Safe";

export default function Home() {
  return (
      <div className='wrapper'>
        <NavBar />
        <About />
        <Petition />
        <div className="main__container">
          <Safe/>
          <CashMachine/>
        </div>
        <Description />
        <Form />
        <Notification />
      </div>
  )
}