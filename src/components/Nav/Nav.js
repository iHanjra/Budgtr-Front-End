import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


import "./Nav.css";

function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li className="left">
            <Link className="navlink" to="/transactions">
              <h1>Budgtr</h1>
            </Link>
          </li>
          <li className="right">
            <Link className="navlink" to="/transactions/new">
              <Button variant="outline-secondary">
                <strong>NEW TRANSACTION</strong>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
