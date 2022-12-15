import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar"

const Navbar = () => {
  return (
    <div className="grid px-24 lg:h-16 bg-3rdcolor">
      <Logo style="col-span-2" />
      <SearchBar />
    </div>
  );
};

export default Navbar;
