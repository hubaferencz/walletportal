import React from "react";

function AffiliateItem(props) {
  //   return (
  // check if the title is "Crypto.com"

  if (props.title === "Crypto.com") {
    return (
      <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <div className="card-wrap">
          <div className="card-header cryptocom">
            {/* <i className="fas fa-code" /> */}
            <img src={props.image} alt="" srcSet="" />
          </div>
          <div className="card-content">
            <h1 className="card-title">{props.title}</h1>
            <p className="card-text">{props.description}</p>
            <a
              href={"Crypto.com"}
              target="_blank"
              className="card-btn cryptocom-btn"
            >
              go to {props.title}
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <div className="card-wrap">
          <div className={`card-header ${props.title.toLowerCase()}`}>
            {/* <i className="fas fa-code" /> */}
            <img src={props.image} alt="" srcSet="" />
          </div>
          <div className="card-content">
            <h1 className="card-title">{props.title}</h1>
            <p className="card-text">{props.description}</p>
            <a
              href={props.link}
              target="_blank"
              className={`card-btn ${props.title.toLowerCase()}-btn`}
            >
              go to {props.title}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AffiliateItem;
