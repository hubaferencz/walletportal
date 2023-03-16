import React from "react";
import UserMenu from "./header/UserMenu";
import logo from "./../images/logo.png";
import google from "./../images/google.png";
// import link for routing purposes
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="sticky top-0 z-30 main-header">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <Link to="/">
            <div className="flex">
              <img className="h-12 fill-current" src={logo} alt="" srcSet="" />
            </div>
          </Link>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* check if user is logged in */}

            {props.auth.currentUser ? (
              <UserMenu
                logout={props.logout}
                auth={props.auth}
                currentUser={props.currentUser}
              />
            ) : (
              <div className="relative inline-flex">
                <button
                  className="inline-flex justify-center items-center group"
                  aria-haspopup="true"
                  onClick={props.signInWithGoogle}
                >
                  <img
                    className="w-23 h-23 rounded-full"
                    src={google}
                    width="52"
                    height="52"
                    alt="User"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
