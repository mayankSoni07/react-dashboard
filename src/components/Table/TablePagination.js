/*eslint-disable*/
import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

export default function CustomTablePagination(props) {
  const {
    filters,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    onRowPageChange,
    count,
  } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (onRowPageChange) onRowPageChange(rowsPerPage, newPage, filters);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (onRowPageChange)
      onRowPageChange(parseInt(event.target.value, 10), page, filters);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
