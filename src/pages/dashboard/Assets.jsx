import React, { useState, useEffect, useRef } from "react";
import "./Assets.css";
import Modal from "../../components/Modal";
import formatNumber from "../../utils/formatNumber";
import DropdownCombobox from "../../components/DropdownCombobox";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/trash.svg";
import pencilIcon from "../../images/pencil.svg";

function Assets(props) {
  const [modalError, setModalError] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();
  const lastModalEl = useRef(null);
  const firstModalEl = useRef(null);

  function handleRemoveCoin(coinToRemove) {
    const newPortfolio = props.portfolio.filter(
      (coin) => coin.name !== coinToRemove
    );

    props.setPortfolio(newPortfolio);
  }
  function handleEdit(event) {
    // The coin with the same name as id is the coin we want to update.
    const coinToUpdate = props.portfolio.find(
      (coin) => coin.name === event.target.id
    );
    // we set the modalContent to the coin we want to update.
    setModalContent({
      name: coinToUpdate.name,
      apiID: coinToUpdate.apiID,
      holdings: event.target.value,
      price: coinToUpdate.price,
      uuid: coinToUpdate.uuid,
    });
    setShowModal(true);
  }
  // modal functions
  function handleHoldingsChange(event) {
    // holdings change handler
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setModalContent({
        ...modalContent,
        holdings: parseFloat(event.target.value),
      });
    } else {
    }
  }
  function saveModalCoinToPortfolio() {
    if (modalContent.holdings > 0) {
      if (
        [...props.portfolio].some((coin) => coin.name === modalContent.name)
      ) {
        // save existing coin to portfolio
        const coinToUpdate = props.portfolio.find(
          (coin) => coin.name === modalContent.name
        );
        const index = props.portfolio.indexOf(coinToUpdate);
        // changing the holdings value in the portfolio
        props.portfolio[index].holdings = modalContent.holdings;
        // only the value of "portfolio[index].holdings" is changed, not the whole object
        props.setPortfolio([...props.portfolio]);
        setShowModal(false);
      } else {
        // save new coin to portfolio
        const newPortfolio = [...props.portfolio, modalContent];
        props.setPortfolio(newPortfolio);
        setShowModal(false);
      }
    } else {
      // modalContent.holdings is 0 or less
      setModalError(true);
    }
  }
  useEffect(() => {
    document.title = "Walletportal";
  }, []);
  useEffect(() => {
    if (modalError) {
      setTimeout(() => {
        setModalError(false);
      }, 4000);
      // cleanup function
      return () => {
        clearTimeout();
      };
    }
  }, [modalError]);

  return (
    <div className="col-span-full xl:col-span-6 shadow-lg rounded-sm chart-box">
      <Modal isShowing={showModal} setShowModal={setShowModal} ref={modalRef}>
        <img
          src={pencilIcon}
          alt="pencilIcon"
          srcSet=""
          className="modal-close"
          onClick={() => setShowModal(false)}
          tabIndex="0"
          ref={firstModalEl}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              // if we are on the first element and press shift + tab we focus the last element
              e.preventDefault();
              lastModalEl.current.focus();
            } else if (e.key === "Enter") {
              setShowModal(false);
            }
          }}
          width="25"
          height="25"
        />
        <div className="modal-content">
          <p className="modal-heading">{modalContent.name + " holdings:"}</p>
          <div className="modal-input-div">
            <p className="modal-error">
              {modalError && "Must be a number greater than 0!"}
            </p>
            <input
              type="number"
              className="modal-input"
              placeholder="Enter holdings"
              step="0.1"
              min="0"
              onChange={handleHoldingsChange}
              autoFocus={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveModalCoinToPortfolio();
                }
              }}
            />
          </div>
        </div>
        <div className="buttons-div">
          <button className="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="submit"
            onClick={saveModalCoinToPortfolio}
            ref={lastModalEl}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                // if we are on the first element and press tab we focus the first element
                e.preventDefault();
                firstModalEl.current.focus();
              }
            }}
          >
            Submit
          </button>
        </div>
      </Modal>

      {/* ----------------------------------------------------------------- */}

      <header className="px-5 py-4 ">
        <h2 className="font-semibold  text-lg asset-header">Assets</h2>
        <DropdownCombobox
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          portfolio={props.portfolio}
        />
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold  text-left">Coin</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold  text-center">Holdings</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold  text-center">Value</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold  text-center">Edit</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {props.portfolio.length > 0 && (
                <>
                  {props.portfolio.map((coin) => (
                    <tr key={coin.uuid}>
                      <td className="p-2">
                        <div className="flex items-center">
                          <img
                            className="shrink-0 mr-2 sm:mr-3"
                            // src={new URL(`./images/icons/${coin.symbol.toLowerCase()}.png`, import.meta.url).href}
                            src={coin.image}
                            alt={coin.name}
                            width="36"
                            height="36"
                            style={{
                              borderRadius: "100px",
                              backgroundColor: "#fff",
                            }}
                          />
                          <div className="">{coin.name}</div>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="text-center">{coin.holdings}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">
                          {"$" + formatNumber(coin.holdings * coin.price, 2)}
                        </div>
                      </td>

                      <td className="p-2">
                        {/* <div className="portfolio-buttons"> */}

                        <div className="text-center">
                          <button onClick={handleEdit} id={coin.name}>
                            <img
                              src={editIcon}
                              alt=""
                              srcSet=""
                              id={coin.name}
                              width={20}
                            />
                          </button>

                          <button onClick={() => handleRemoveCoin(coin.name)}>
                            <img
                              src={deleteIcon}
                              alt=""
                              srcSet=""
                              id={coin.name}
                              width={20}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Assets;
