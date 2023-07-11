import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ShowAllTransactions.css";

function ShowAllTransactions() {
  const [transactionsArray, setTransactionsArray] = useState([]);

  async function fetchData() {
    try {
      let result = await axios.get(
        "https://budgtr-backend.onrender.com/transactions"
      );
      setTransactionsArray(result.data);
      console.log(transactionsArray)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let total = transactionsArray.reduce(
    (accumulator, transactions) => accumulator + Number(transactions.amount),
    0
  );

  let formattedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getTotalColor = (total) => {
    if (total > 100) {
      return "green";
    } else if (total >= 0 && total <= 100) {
      return "yellow";
    } else {
      return "red";
    }
  };

  transactionsArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  
  return (
    <div>
      <h2 className={`h2-title ${getTotalColor(total)}`}>
        Bank Account Total: {formattedTotal}
      </h2>
      <div className="table-container">
        <table id="transactions">
          <tbody className="Transaction">
            {transactionsArray.map(({ date, name, amount, id }) => {
              const formattedDate = new Date(date).toISOString().split("T")[0];
              return (
                <tr key={id}>
                  <td>
                    <h2>{formattedDate}</h2>
                  </td>

                  <td>
                    <Link to={`/transactions/${id}`}>
                      <h2>{name}</h2>
                    </Link>
                  </td>

                  <td>
                    <h2>${amount}</h2>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ShowAllTransactions;
