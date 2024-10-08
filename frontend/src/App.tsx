import "./App.css";
import { Text } from "./components/Text";
import { Timetable } from "./components/TimeTables"
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <>
    <Analytics/>
      <div className="h-screen max-w-full  bg-black bg-grid-white/[0.2] flex flex-col  justify-center overflow-hidden"> 
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div> 
      <Text/>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Timetable />
        </div>
    </>
  );
}

export default App;
