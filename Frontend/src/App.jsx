import { useState } from "react";
import Canvas from "./components/Canvas";
import Customizer from "./components/Customizer";

/** Default logo shown on first load; Customizer replaces this with the new Cloudinary URL after upload. */
const DEFAULT_LOGO_URL =
  "https://res.cloudinary.com/di9ljccil/image/upload/v1777815135/threejs_lww47e.png";

const App = () => {
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_URL);

  return (
    <main className="h-screen w-screen bg-amber-100 gap-4">
      <div className="h-[70%]">
        <Canvas logoUrl={logoUrl} />
      </div>
      <div className="h-[30%]">
        <Customizer setLogoUrl={setLogoUrl} />
      </div>
    </main>
  );
};

export default App;
