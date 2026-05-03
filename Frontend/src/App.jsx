import React from "react";
import Canvas from "./components/Canvas";
import Customizer from "./components/Customizer";

const App = () => {
  return (
    <main className="h-screen w-screen bg-amber-100 gap-4">
      <div className="h-[70%]">
        <Canvas />
      </div>
      <div className="h-[30%]">
        <Customizer />
      </div>
    </main>
  );
};

export default App;
