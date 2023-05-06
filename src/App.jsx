import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./Components/Header";
import { useState } from "react";
import { useEffect } from "react";
const ProductId=React.lazy(()=>import("./Components/ProductId"))

const App = () => 
{
  const [addCart, setAddCart] = useState(false)

  localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJqb2huIiwibGFzdE5hbWUiOiJkb2UiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwicGhvbmUiOiIxMjM0NTY3ODkwIiwiY3JlYXRlZEF0IjoiMjAyMy0wMi0yMlQxNzo0MjozMi4yMzhaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0yMlQxNzo0MjozMi4yMzhaIn0sImlhdCI6MTY4MzM1MDcwM30.sBetr8rrwKEP7kFrLQpzKxVstwQnYNeoWPoj7DlvHQM')
  useEffect(() => {
    console.log(addCart)
  }, [addCart])

  const addToCard=()=>{
    setAddCart(true)
  }
  
  const NegativeState=()=>{
    setAddCart(false)
  }
  return(
  <div className="app">
      <Header/>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={"Cargando..."}>
          <ProductId addToCard={addToCard} NegativeState={NegativeState}/>
         </Suspense>
        }/>
  
      </Routes>
    </div>
)
      };
ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
, document.getElementById("app"));
