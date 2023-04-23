import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./Components/Header";
const ProductId=React.lazy(()=>import("./Components/ProductId"))

const App = () => (
  <div className="app">
      <Header/>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={"Cargando..."}>
          <ProductId/>
         </Suspense>
        }/>
  
      </Routes>
    </div>
);
ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
, document.getElementById("app"));
