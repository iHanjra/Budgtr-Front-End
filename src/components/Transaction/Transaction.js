import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Transaction.css";
import { Button } from "react-bootstrap";

function Transaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function fetchData() {
    try {
      let result = await axios.get(
        `https://budgtr-backend.onrender.com/transactions/get-transaction-by-id/${id}`
      );
      const { date, ...transaction } = result.data.data;
      const formattedDate = new Date(date).toISOString().split("T")[0];
      setTransaction({ ...transaction, date: formattedDate });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDeleteById(id) {
    setShowConfirmation(true);
  }

  async function handleConfirmDelete() {
    try {
      await axios.delete(
        `https://budgtr-backend.onrender.com/transactions/delete-transaction-by-id/${id}`
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
          {transaction?.name}{" "}
          {transaction?.amount < 0 ? "paid to" : "sent from"}{" "}
          {transaction?.from}
        </h2>
        <h3>${transaction?.amount}</h3>
      </div>
      <div className="transaction-container-navigation">
        <ul>
          <li>
            <Button
              Button
              variant="secondary"
              onClick={() => navigate("/transactions")}
            >
              Back
            </Button>
          </li>
          <li>
            <Button
              variant="secondary"
              onClick={() => navigate(`/transactions/${id}/edit`)}
            >
              Edit
            </Button>
          </li>
          <li>
            <Button
              Button
              variant="danger"
              onClick={() => handleDeleteById(id)}
            >
              Delete
            </Button>
          </li>
        </ul>
      </div>
      {showConfirmation && (
        <div className="transaction-deletion-container-navigation">
          <p>
            <strong>Are you sure you want to delete this transaction?</strong>
          </p>
          <ul>
            <li>
              <Button variant="primary" onClick={handleConfirmDelete}>
                Yes
              </Button>
            </li>
            <li>
              <Button variant="secondary" onClick={handleCancelDelete}>
                No
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Transaction;
