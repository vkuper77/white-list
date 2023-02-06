import About from "@/src/components/About/About";
import CashMachine from "@/src/components/Cash Machine/CashMachine";
import Description from "@/src/components/Description/Description";
import NavBar from "@/src/components/NavBar/NavBar";
import Petition from "@/src/components/Petition/Petition";
import Safe from "@/src/components/Safe/Safe";
import { Quantico } from '@next/font/google'

const quantico = Quantico({subsets: ['latin'], weight: '400' })

export default function Home() {
  return (
      <div className={`wrapper ${quantico.className}`}>
        <NavBar />
        <About />
        <Petition />
        <div className="main__container">
          <Safe/>
          <CashMachine/>
        </div>
        <Description />
      </div>
  )
}