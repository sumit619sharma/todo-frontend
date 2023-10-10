import React, { useState,useEffect } from "react";


import { useDispatch } from "react-redux";
import { getallTodo } from "../../store/todo-thunk";
import { setCurrentpage } from "../../store/todoSlice";
import   Pagination from "react-js-pagination"


export default function PaginationList({ totalcount }) {
  const [Page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getallTodo(token, Page));
}, [Page]);

  const pageHandler = ( value) => {
    setPage(value);
    dispatch(setCurrentpage(value));
  };
  return (
    
      <div className="d-flex justify-content-center align-items-center m-auto " >
      <Pagination itemClass="page-item"
      linkClass="page-link"
      activePage={Page}
      itemsCountPerPage={5}
      totalItemsCount={totalcount}
      pageRangeDisplayed={5}
      onChange={pageHandler}
    />
      </div>
      
    
  );
}
