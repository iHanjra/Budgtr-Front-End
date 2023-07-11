import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditForm.css";
import { Button } from "react-bootstrap";

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

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await axios.get(
          `https://budgtr-backend.onrender.com/transactions/get-transaction-by-id/${id}`
        );
        const { date, ...transactionData } = result.data.data;
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setTransaction({ ...transactionData, date: formattedDate });
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [id]);

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(
        `https://budgtr-backend.onrender.com/transactions/update-transaction-by-id/${id}`,
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
  
  return (
    <div className="edit-form-container">
      <h2>Edit item</h2>
      <div className="form-container-form">
        <form onSubmit={handleOnSubmit}>
          <div style={{ marginLeft: "10px" }} className="form-container-input">
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
          <div className="edit-container-input">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <div>
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
          </div>
          <div className="edit-container-input">
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
          <div className="edit-container-input">
            <label htmlFor="from">
              <strong>From</strong>
            </label>
            <div>
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
          </div>
          <div className="edit-container-input">
            <label htmlFor="category">
              <strong>Category</strong>
            </label>
            <div>
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
          </div>
          <Button
            style={{ margin: "10px" }}
            variant="outline-secondary"
            type="submit"
          >
            <strong>EDIT ITEM</strong>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditTransaction;
