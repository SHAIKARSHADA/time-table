import "./App.css";
import { Text } from "./components/Text";
function App() {
  return (
    <>
      <main className="h-screen w-full  bg-black  dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          <Text/>
        </div>
      </main>
    </>
  );
}

export default App;
