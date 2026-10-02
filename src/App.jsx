import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import InfiniteSpiral from "./components/InfiniteSpiral";

const loadingItems = [
  { id: "circuit-board", src: "/images/loading/circuit-board.jpg", alt: "Circuit board" },
  { id: "robotics", src: "/images/loading/robotics.jpg", alt: "Humanoid robot" },
  { id: "collaboration", src: "/images/loading/collaboration.jpg", alt: "Shared workspace" },
  { id: "night-sky", src: "/images/loading/night-sky.jpg", alt: "Neon-lit city at night" },
  { id: "digital-code", src: "/images/loading/digital-code.jpg", alt: "Green digital code" },
  { id: "digital-workspace", src: "/images/loading/digital-workspace.jpg", alt: "Working at a laptop" },
];

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return undefined;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const timeoutId = window.setTimeout(() => setIsReady(true), 2400);

    return () => {
      window.clearTimeout(timeoutId);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isReady]);

  return (
    <>
      <div className={`app-content${isReady ? " is-ready" : ""}`} aria-hidden={!isReady}>
        {isReady && <HomePage />}
      </div>
      <section className={`loading-screen${isReady ? " is-finished" : ""}`} aria-label="Loading portfolio">
        {!isReady && (
          <InfiniteSpiral
            items={loadingItems}
            animationMode="auto"
            speed={0.7}
            direction="up"
            cardWidth={132}
            cardHeight={160}
            verticalSpacing={42}
            radius={184}
            grayscale={0.15}
            pauseOnHover={false}
            className="loading-spiral"
          />
        )}
        <p className="loading-wordmark">CYBRNINJAX<span>.</span></p>
        <p className="loading-status" role="status">Preparing your view</p>
        <div className="loading-progress" aria-hidden="true"><span /></div>
      </section>
    </>
  );
}

export default App;