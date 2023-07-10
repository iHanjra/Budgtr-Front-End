import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ShowAllTransactions.css";

function ShowAllTransactions() {
  const [transactionsArray, setTransactionsArray] = useState([]);

  async function fetchData() {
    try {
      let result = await axios.get("http://localhost:3001/transactions");
      setTransactionsArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  let total = transactionsArray.reduce(
    (accumulator, transactions) => accumulator + transactions.amount,
    0
  );

if (total <= 0) {
  total = 0;
}
  
  return (
    <div>
      <h2 className="h2-title">Bank Account Total: ${total}</h2>
      <div className="table-container">
        <table id="transactions">
          <tbody className="Transaction">

            {transactionsArray.map(
              ({ date, name, amount, id }) => {
                return (
                  <tr key={id}>
                    <td>
                        <h2>{date}</h2>
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
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ShowAllTransactions;
