import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

// Public Portfolio Layout
const PortfolioLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-14" style={{ marginLeft:0, paddingLeft:0 }}>
        <Home />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PortfolioLayout />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
