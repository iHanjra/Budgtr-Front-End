import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TransactionForm.css";

function TransactionForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    from: "",
    category: ""
  });

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/transactions/create-transaction`,
        {
          ...transaction,
        }
      );
    
      const id = response.data.data.id;
      navigate(`/transactions/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="form-form-container">
      <h2>Add a new item</h2>
      <div className="form-container-form">
        <form onSubmit={handleOnSubmit}>
          <div className="form-container-input">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={transaction.date}
              onChange={(e) =>
                setTransaction({ ...transaction, date: e.target.value })
              }
              required
            />
          </div>
          <div className="form-container-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={transaction.name}
              onChange={(e) =>
                setTransaction({ ...transaction, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-container-input">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: e.target.value })
              }
              required
            />
          </div>
          <div className="form-container-input">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              value={transaction.from}
              onChange={(e) =>
                setTransaction({ ...transaction, from: e.target.value })
              }
              required
            />
          </div>
          <div className="form-container-input">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={transaction.category}
              onChange={(e) =>
                setTransaction({ ...transaction, category: e.target.value })
              }
              required
            />
          </div>
          <button>Create New Item</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
