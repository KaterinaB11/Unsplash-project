import React, { useState } from "react";
import "./SCSS/App.scss";
import AuthorInfo from "./JSX/AuthorInfo";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import SearchBar from "./JSX/SearchBar";

export default function App() {
  const apiKey = "JOka4Zkw_-EOKGwoJ3WDtnArOhuoUSkC9SXxdAOn0dk";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/:authorUsername" element={<AuthorInfo apiKey={apiKey} />} />
      </Routes>
    </Router>
  );
}
