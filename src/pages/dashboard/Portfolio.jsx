import React from "react";
import PieChart from "../../charts/PieChart";
import { Link } from "react-router-dom";

function Portfolio(props) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 shadow-lg rounded-sm chart-box">
      <header className="px-5 py-4 ">
        <h2 className="font-semibold text-lg text-slate-800">Portfolio</h2>
        <Link to="get-crypto">
          <p className="get-crypto bg-blue-500 text-white font-bold py-2 px-4 font-semibold text-lg text-slate-800">
            Get Crypto
          </p>
        </Link>
      </header>
      <div className="flex flex-col justify-center items-center">
        <PieChart coins={props.coins} />
      </div>
    </div>
  );
}

export default Portfolio;
