import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import {createBrowserRouter, RouterProvider,Outlet} from "react-router-dom"
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
    
  return (
    <div className="main">
      <Header />
      <Outlet/>
    </div>
  );
}

const routersConfig=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/',
        element:<Body/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },{
        path:'/restaurants/:resId',
        element:<RestaurantMenu/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={routersConfig}/>
)
