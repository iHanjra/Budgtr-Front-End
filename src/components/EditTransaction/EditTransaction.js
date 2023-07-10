import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditForm.css";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  async function fetchData() {
    try {
      let result = await axios.get(
        `http://localhost:3001/transactions/get-transaction-by-id/${id}`
      );
     const { date, ...transaction } = result.data.data;
     const formattedDate = new Date(date).toISOString().split("T")[0];
     setTransaction({ ...transaction, date: formattedDate });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3001/transactions/update-transaction-by-id/${id}`,
        {
          name: transaction.name,
          amount: transaction.amount,
          date: transaction.date,
          from: transaction.from,
          category: transaction.category,
        }
      );
      alert("Updated Successfully");
      navigate(`/transactions/${id}`);
    } catch (e) {
      console.log(e.response);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="form-form-container">
      <h2>Edit item</h2>
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
          <button>Edit Item</button>
        </form>
      </div>
    </div>
  );
}

export default EditTransaction;
