import React from "react";
import { Outlet } from "react-router-dom";

const ProductLayOut = () => {
  return (
    <div>
      <aside >
       
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductLayOut;
