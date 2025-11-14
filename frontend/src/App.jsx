import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Edit from "./pages/Edit";
import AuthSystem from "./pages/AuthSystem";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<Edit />} />
          <Route path="/auth-system" element={<AuthSystem />} />
        </Routes>
      </main>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
};

export default App;
