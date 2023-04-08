import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <aside className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-light px-2 bg-dark">
          <a className="navbar-brand text-white" href="/admin/dashbroad">
            All Product
          </a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link text-white" href="/admin/dashbroad/category">
                  Category 
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link text-white" href="/admin/dashbroad/addproduct">
                  Add Product 
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link text-white" href="/admin/dashbroad/category/add">
                  Add Category
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
