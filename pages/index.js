import About from "@/src/components/About";
import NavBar from "@/src/components/NavBar";

export default function Home() {
  return (
    <div>
      <div className="header">
        <NavBar />
      </div>
      <div>
        <About />
      </div>
    </div>
  )
}
