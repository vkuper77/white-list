import NavBar from "@/src/components/NavBar/NavBar";
import About from "@/src/components/About/About";
import CashMachine from "@/src/components/Cash Machine/CashMachine";
import Description from "@/src/components/Description/Description";
import Form from "@/src/components/Form/Form";
import Notification from "@/src/components/UI/Notification";
import Petition from "@/src/components/Petition/Petition";
import Safe from "@/src/components/Safe/Safe";
import Tips from "@/src/components/UI/Tips";

export default function Home() {
  return (
      <div className='wrapper'>
        {/* <Tips /> */}
        <NavBar />
        {/* <About /> */}
        {/* <Petition /> */}
        {/* <div className="main__container"> */}
          {/* <Safe> */}
            {/* <CashMachine/> */}
          {/* </Safe> */}
        {/* </div> */}
        {/* <Description /> */}
        {/* <Form /> */}
        {/* <Notification /> */}
      </div>
  )
}