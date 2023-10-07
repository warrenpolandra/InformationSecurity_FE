"use client";
import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Toast } from "./components/Toast";
import "./styles/dashboard.css";

const dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleSidebarClick = (componentName: React.SetStateAction<string>) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="dashboard">
      <Toast />
      <Sidebar onButtonClick={handleSidebarClick} />
      {selectedComponent === "home" && <Home />}
      {selectedComponent === "upload" && <Upload />}
    </div>
  );
};

export default dashboard;
