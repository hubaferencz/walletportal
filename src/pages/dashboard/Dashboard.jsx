import React from "react";
import Assets from "./Assets";
import Portfolio from "./Portfolio";

function Dashboard(props) {
  return (
    <>

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* <div className="sm:flex sm:justify-between sm:items-center mb-8"></div> */}

              <div className="grid grid-cols-10 gap-6">
                <Portfolio coins={props.coins} />
                <Assets
                  portfolio={props.portfolio}
                  setPortfolio={props.setPortfolio}
                  totalPortfolioValue={props.totalPortfolioValue}
                />
              </div>
            </div>
          </main>


    </>
  );
}

export default Dashboard;
