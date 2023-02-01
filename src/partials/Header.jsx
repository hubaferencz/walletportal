import React from "react";
import UserMenu from "./header/UserMenu";
import logo from "./../images/logo.png";

function Header() {

  return (
    <header className="sticky top-0 z-30 main-header">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <img
              className="h-14 fill-current"
              src={logo}
              alt=""
              srcSet=""
            />
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
