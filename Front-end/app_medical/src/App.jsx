import "./App.css";
import Navbar from "./Components/Navbar";
import {Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home/Home";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;

