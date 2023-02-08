// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// import './charts/ChartjsConfig';

// Import pages
import Dashboard from "./pages/dashboard/Dashboard";
import Affiliate from "./pages/affiliate/Affiliate";

import Header from "./partials/Header";

import { useLocalStorage } from "./hooks/useLocalStorage";
import useSWR from "swr";

import randomColor from "randomcolor";

import { signOut } from "firebase/auth";
import { signInWithGoogle, auth, db } from "./firebase";

import { doc,  onSnapshot, setDoc } from "firebase/firestore";
import { FastAverageColor } from "fast-average-color";

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  let [coins, setCoins] = useState([]);

  const [portfolio, setPortfolio] = useLocalStorage("portfolio", []);

  const allAPIIDs = portfolio.map((coin) => coin.apiID).join(",");

  const totalPortfolioValue =
    portfolio.length > 0
      ? Number(
          portfolio
            .map((coin) => coin.price * coin.holdings)
            .reduce((a, b) => a + b)
            .toFixed(2)
        )
      : null;

  const {} = useSWR(
    allAPIIDs.length > 0 &&
      `https://api.coingecko.com/api/v3/simple/price?ids=${allAPIIDs}&vs_currencies=usd`,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setPortfolio(
          portfolio.map((coin) => {
            return {
              ...coin,
              price: data[coin.apiID].usd,
            };
          })
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  // update portfolio item with the percentage of the total portfolio value
  useEffect(() => {
    if (portfolio.length > 0 && totalPortfolioValue) {
      let localCoins = [];
      portfolio.forEach((coin) => {
        // let [color, setColor] = useState();
        let coinPercentage =
          (coin.price * coin.holdings * 100) / totalPortfolioValue;
        coin.percentage = coinPercentage;

        // try to get the color from the image if fails set a random color
        try {
          new FastAverageColor()
            .getColorAsync(require(`./coins/${coin.symbol.toLowerCase()}.png`))
            .then((color) => {
              coin.color = color.hex;
            });
        } catch (error) {
          // console.log(error);
        }
        if (coin.color === undefined) {
            coin.color = randomColor({
              luminosity: "dark",
              hue: "blue",
            });
          }


        localCoins.push({
          symbol: coin.symbol,
          amount: coin.holdings,
          color: coin.color,
          inUSD: coin.price,
        });
      });
      setCoins(localCoins);
    }
  }, [portfolio, totalPortfolioValue]);

  // console.log(portfolio);
  // console.log(totalPortfolioValue);

  let [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // check if there is a portfolio already in local storage, if so back up to database
      if (user && portfolio.length > 0) {
        setDoc(doc(db, "users", user.uid), {
          portfolio: portfolio,
        });
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [portfolio]);

  // detect if portfolio is changed and update database
  useEffect(() => {
    if (auth.currentUser && portfolio.length > 0) {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        portfolio: portfolio,
      });
    }
  }, [portfolio]);

  // when user logs in, check if there is a portfolio in the database, if so update local storage
  useEffect(() => {}, [currentUser]);

  // create logout function using firebase v9
  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("portfolio");
        // reload page
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // when user logs in, check if there is a portfolio in the database, if so update local storage once and then remove the listener firebase v9
  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists) {
          setPortfolio(doc.data().portfolio);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      {/* create base here, create routes and pass in needed props to component */}
      <div id="page-container">
        <div id="content-wrap">
          <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Header
                signInWithGoogle={signInWithGoogle}
                logout={logout}
                auth={auth}
                currentUser={currentUser}
              />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Dashboard
                      portfolio={portfolio}
                      setPortfolio={setPortfolio}
                      totalPortfolioValue={totalPortfolioValue}
                      coins={coins}
                      setCoins={setCoins}
                      currentUser={currentUser}
                      logout={logout}
                      signInWithGoogle={signInWithGoogle}
                    />
                  }
                />
                <Route exact path="/get-crypto" element={<Affiliate />} />
              </Routes>

              <div className="footer">
                built by{" "}
                <a href="https://hubaferencz.com/" target={"_blank"}>
                  <u>Huba Ferencz</u>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
