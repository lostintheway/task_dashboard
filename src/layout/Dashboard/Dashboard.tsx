import React from "react";
import "./Dashboard.scss";
import { Link, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <aside className="">
        <h2>Logo</h2>
        <ul>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </ul>
      </aside>

      <main className="">
        <nav className="">
          <ul>Dashboard</ul>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
