import { useState } from "react";
import { close, menu } from "../assets";
// import bocchi from "../assets/bocchi.jpg";
import teamupnologo from "../assets/teamupnologo.png";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={teamupnologo} alt="fotologo" className="w-[200px] h-full" />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
        >
          <a href={"#home"}>Login</a>
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[16px] mr-0 text-white `}
        >
          <a href={"#home"}>Register</a>
        </li>
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((men) => !men)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            <li
              className={`font-poppins font-normal cursor-pointer text-[16px] mb-4 text-white `}
            >
              <a href={"#home"}>Login</a>
            </li>
            <li
              className={`font-poppins font-normal cursor-pointer text-[16px] mr-0 text-white `}
            >
              <a href={"#home"}>Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;