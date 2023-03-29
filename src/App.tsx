import React from 'react';
import s from './App.module.css';
import {Link, Route, Routes} from "react-router-dom";
import AboutPage from "./pages/aboutPage/AboutPage";
import NewsPage from "./pages/mainPage/NewsPage";

function App() {
   
  return (
    <div className={s.wrapper}>
        <Routes>
            <Route path='/' element={<NewsPage/>} />
            <Route path='/new/*' element={<AboutPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
