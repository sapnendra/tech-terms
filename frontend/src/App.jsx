// import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "./apiInstance";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiInstance.post("/auth/register", formData);
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
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-lg"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-lg"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="border border-gray-600 text-white px-8 py-2 rounded-lg text-lg"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
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
