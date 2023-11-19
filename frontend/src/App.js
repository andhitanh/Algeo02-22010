import About from "./components/About";
import ImgUpload from "./components/ImgUpload";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Result from "./components/Result";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react'

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 8;

  return (
    <div>
      <Navbar/>
      <ImgUpload/>
      <Result currentPage={currentPage} setCurrentPage={setCurrentPage} imagesPerPage={imagesPerPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <About/>
    </div>
  );
}

export default App;
