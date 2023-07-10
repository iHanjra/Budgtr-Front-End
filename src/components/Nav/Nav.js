import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li className="left">
            <Link className="navlink" to="/transactions">
              Budgtr
            </Link>
          </li>
          <li className="right">
            <Link className="navlink" to="/transactions/new">
              New
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
