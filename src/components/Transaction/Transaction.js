import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Transaction.css";

function Transaction() {
  const { id } = useParams();
  const [transactionsArray, setTransactionsArray] = useState([]);
  const [transaction, setTransaction] = useState({});
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function fetchData() {
    try {
      let result = await axios.get(
        `http://localhost:3001/transactions/get-transaction-by-id/${id}`
      );
      setTransaction(result.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchTransactionsData() {
    try {
      let result = await axios.get("http://localhost:3001/transactions");
      setTransactionsArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
    fetchTransactionsData();
  }, []);

  async function handleDeleteById(id) {
    setShowConfirmation(true);
  }

  async function handleConfirmDelete() {
    try {
      await axios.delete(
        `http://localhost:3001/transactions/delete-transaction-by-id/${id}`
      );

      alert("Transaction Deleted");
      navigate("/transactions");
    } catch (e) {
      console.log(e);
    }
  }

  function handleCancelDelete() {
    setShowConfirmation(false);
  }

  return (
    <div className="transaction-container">
      <h3>Transaction Date: {transaction?.date}</h3>
      <div className="transaction-container-content">
        <h2>
          {transaction?.name} - From {transaction?.from}
        </h2>
        <h3>${transaction?.amount}</h3>
      </div>
      <div className="transaction-container-navigation">
        <ul>
          <li>
            <button onClick={() => navigate("/transactions")}>Back</button>
          </li>
          <li>
            <button onClick={() => (`/transactions/${id}/edit`)}>Edit
            </button>
          </li>
          <li>
            <button onClick={() => handleDeleteById(id)}>Delete</button>
          </li>
        </ul>
      </div>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this transaction?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default Transaction;
