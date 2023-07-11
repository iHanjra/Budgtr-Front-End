import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TransactionForm.css";
import { Button } from "react-bootstrap";

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
        `https://budgtr-backend.onrender.com/transactions/create-transaction`,
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
            <label htmlFor="date">
              <strong>Date</strong>
            </label>
            <div>
              <input
                style={{ width: "185px" }}
                type="date"
                id="date"
                value={transaction.date}
                onChange={(e) =>
                  setTransaction({ ...transaction, date: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="form-container-input">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <div>
              <input
                placeholder="Name"
                type="text"
                id="name"
                value={transaction.name}
                onChange={(e) =>
                  setTransaction({ ...transaction, name: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="form-container-input">
            <label htmlFor="amount">
              <strong>Amount</strong>
            </label>
            <div>
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
          </div>
          
          <div className="form-container-input">
            <label htmlFor="from">
              <strong>From</strong>
            </label>
            <div>
              <input
                placeholder="From"
                type="text"
                id="from"
                value={transaction.from}
                onChange={(e) =>
                  setTransaction({ ...transaction, from: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="form-container-input">
            <label htmlFor="category">
              <strong>Category</strong>
            </label>
            <div>
              <input
                placeholder="Category"
                type="text"
                id="category"
                value={transaction.category}
                onChange={(e) =>
                  setTransaction({ ...transaction, category: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <Button
            style={{ margin: "10px" }}
            variant="outline-secondary"
            type="submit"
          >
            <strong>CREATE NEW ITEM</strong>
          </Button>
        
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
