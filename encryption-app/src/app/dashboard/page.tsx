"use client";
import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import "./styles/dashboard.css";

const dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleSidebarClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="dashboard">
      <Sidebar onButtonClick={handleSidebarClick} />
      {selectedComponent === "home" && <Home />}
      {selectedComponent === "upload" && <Upload />}
    </div>
  );
};

export default dashboard;
