import React from "react";
import { MainScreen } from "./screens/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
