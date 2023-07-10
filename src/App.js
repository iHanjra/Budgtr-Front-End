import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowAllTransactions from "./components/AllTransactions/ShowAllTransactions";
import Transaction from "./components/Transaction/Transaction";
import Nav from "./components/Nav/Nav";
import TransactionForm from "./components/CreateTransaction/TransactionForm";
import EditTransaction from "./components/EditTransaction/EditTransaction";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ShowAllTransactions />} />
        <Route path="/transactions" element={<ShowAllTransactions />} />
        <Route path="/transactions/new" element={<TransactionForm />} />
        <Route path="/transactions/:id" element={<Transaction />} />
        <Route path="/transactions/:id/edit" element={<EditTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
