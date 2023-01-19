import React from "react";

const Pagination = ({ todoPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTodos / todoPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="position-absolute top-100 start-50 translate-middle pb-5">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
