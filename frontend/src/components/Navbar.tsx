import React from "react";
import logo from "../assets/logo.png";
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/Ai'

const Navbar = () => {
  return (
    <nav className="bg-tertiary">
      <div className="mx-auto px-6 py-3 md:flex md:justify-between md:align-items">
          <a
              className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              href="/"
          >
            <img className="h-8 mt-1 ml-10" src={logo}/>
          </a>
            
        <form className="centered">
          
          <select className="px-[12px] py-[6px] h-[38px] w-auto text-white border border-solid border-primary bg-black rounded-l-lg cursor-pointer">
            <option selected>ALL</option>
            <option value="1">Ifrane</option>
            <option value="2">Casablanca</option>
            <option value="3">Marrakech</option>
          </select>
          
          <input className="form-control relative flex-auto min-w-0 w-[800px] block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search for a product... "/>
          <button type="submit" className="btn px-6 py-2.5 bg-secondary text-black font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-primary hover:shadow-lg focus:bg-orange-600 hover:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center border border-solid border-black">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
        </form>
        
        <div className="centered gap-5">
          <a className="px-2.5 py-2.5 rounded-full bg-secondary cursor:pointer border-2 hover:border-black" href="/">
            <AiOutlineShoppingCart />
          </a>
          <a className="px-2.5 py-2.5 rounded-full bg-secondary cursor:pointer border-2 hover:border-black " href="/">
            <AiOutlineUser />
          </a>
        </div>

      </div>

    </nav>
  );
};
export default Navbar;
