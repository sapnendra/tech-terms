// import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "./apiInstance";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    const response = await apiInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    if (response.data.success) {
      toast.success(response.data.message, { position: "top-center" });
    } else {
      toast.error(response.data.message, { position: "top-center" });
    }
  };

  return (
    <div className="h-screen bg-[#000] flex flex-col gap-10 items-center justify-center">
      <h2 className="text-4xl text-white font-bold text-center">
        Registration Form
      </h2>
      <div className="border border-gray-500 p-10 rounded-lg">
        <form className="flex flex-col gap-3" onSubmit={handleForm}>
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-2xl"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-2xl"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-2xl"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-5 py-2 bg-blue-500 text-xl text-white font-semibold w-30 mx-auto rounded-lg mt-6 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
