import Header from "./components/Header.jsx";
import "./styles/fonts.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx"; 
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  return (
    <>
    <CustomCursor />
      <main>
        <Header />
        <Home />
        <About />
        <Work />
        <Contact /> 
      </main>
    </>
  );
}
