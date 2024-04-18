import { useState } from "react";
import brandLogo from "../assets/brandLogo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  const [LoginLogoutBtn,setLoginLogoutBtn]=useState("Login");
  console.log("Heading Start");
  return (
    <div className="header flex justify-between px-5 py-2 items-center border border-black">
      <div className="logo w-[100px]">
        <img className="rounded-[50%]" src={brandLogo} alt="brandLogo" />
      </div>
      <div className="nav">
        <ul className="flex gap-x-16 text-[20px] items-center">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to={'/contact'}>Contact</Link></li>
          <li>Cart</li>
          <button className="p-1 border-2 border-black hover:bg-gray-200 rounded-lg hover:cursor-pointer" onClick={()=>{
            LoginLogoutBtn === "Login" ? setLoginLogoutBtn("Logout"):setLoginLogoutBtn("Login");
            console.log(LoginLogoutBtn)
          }}>{LoginLogoutBtn}</button>
        </ul>
      </div>
      {console.log("Heading End")}
    </div>
  );

};

export default Header;
