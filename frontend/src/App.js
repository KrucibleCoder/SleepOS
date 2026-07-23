import "@/App.css";
import SmoothScroll from "@/components/SmoothScroll";
import ProgressBar from "@/components/ProgressBar";
import Nav from "@/components/sections/Nav";
import Loader from "@/components/sections/Loader";
import Hero from "@/components/sections/Hero";
import Editorial from "@/components/sections/Editorial";
import FabricStack from "@/components/sections/FabricStack";
import Manifesto from "@/components/sections/Manifesto";
import StickyStory from "@/components/sections/StickyStory";
import LayerShowcase from "@/components/sections/LayerShowcase";
import ThreeShowcase from "@/components/sections/ThreeShowcase";
import Catalogue from "@/components/sections/Catalogue";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import TrialForm from "@/components/sections/TrialForm";
import Footer from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App grain" data-testid="app-root">
      <Loader />
      <SmoothScroll>
        <ProgressBar />
        <Nav />
        <main>
          <Hero />
          <Editorial />
          <FabricStack />
          <Manifesto />
          <StickyStory />
          <LayerShowcase />
          <ThreeShowcase />
          <Catalogue />
          <Marquee />
          <Stats />
          <TrialForm />
          <Footer />
        </main>
      </SmoothScroll>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
