/*eslint-disable*/
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
// Icons
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
// core components
import CustomerSearch from "views/Customer/CustomerSearch";
import Table from "components/Table/Table.js";
import CustomTablePagination from "components/Table/TablePagination.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  getCustomerData,
  resetAddEditDeleteCustomer,
  deleteCustomer
} from "redux/actionCreators/customer";
import { allHeaders, defaultHeaders } from "variables/customer/customerTable";
// import { getRandomNumber } from "utils/utilities";
// To get History context from contextAPI
import HistoryContext from "context/historyContext";
// Style
import { infoColor } from "assets/jss/material-dashboard-react.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/customer/customerStyle";
import loginStyles from "assets/jss/material-dashboard-react/views/loginStyle";
const useStyles = makeStyles({ ...styles, ...loginStyles });

export default function Customer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // To get History context from contextAPI
  const history = useContext(HistoryContext);

  // Data from Reducer
  const { customerData, deleteCustomerSuccess } = useSelector(
    (state) => state.customer
  );
  // Local states :
  // Data to show in Table
  const [dataToShow, setDataToShow] = useState([]);
  // State for Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Page number (starting from 0)
  const [page, setPage] = React.useState(0);
  // Headers to show in Table
  const [headerToShow, setHeaderToShow] = React.useState({ ...defaultHeaders });
  // Filters
  const [filters, setFilters] = React.useState("");

  // Preparing listing data from api response data for selected headers
  const setCustomerDataForListing = (headerToShow) => {
    let listData = [];
    customerData.users &&
      customerData.users.map((data) => {
        let arr = [];
        Object.keys(headerToShow).map((key) => {
          if (key === "Action") arr.push(tableActions(data));
          else arr.push(`${data[headerToShow[key]]}`);
        });
        listData.push(arr);
      });
    setDataToShow(listData);
  };

  // Param :
  // rowsPerPage : Rows per page
  // page : page number
  const fetchCustomerData = (rowsPerPage, page, filter) => {
    dispatch(
      getCustomerData({ limit: rowsPerPage, page: page, filter: filter })
    );
  };

  // Used to render Table actions like Edit or Delete
  const tableActions = (data) => {
    return (
      <span>
        <span
          title="Edit"
          className={classes.cursorPointer}
          onClick={() => {
            history.push({
              pathname: "/admin/addEditCustomer",
              state: data
            });
          }}
        >
          <Edit />
        </span>
        {/* <span
          title="Delete"
          className={classes.cursorPointer}
          onClick={() => {
            dispatch(deleteCustomer(data.id));
          }}
        >
          <Delete />
        </span> */}
        <span
          title="Services"
          className={classes.cursorPointer}
          onClick={() => {
            history.push(
              `./services?customerId=${data.id}&name=${
                data.firstName ? data.firstName : ""
              } ${data.middleName ? data.middleName : ""} ${
                data.lastName ? data.lastName : ""
              }`
            );
          }}
        >
          <SettingsIcon />
        </span>
      </span>
    );
  };

  // Used to render Checkbox
  const renderTableHeaderOptionWithCheckbox = (label, key) => {
    return (
      <span
      // key={`${key}-${getRandomNumber()}`}
      >
        <FormControlLabel
          style={{ color: "black" }}
          control={
            <Checkbox
              style={{ color: "#fff" }}
              checked={Object.keys(headerToShow).includes(label)}
              name={label}
              onChange={(e) => {
                // Set headerToShow data into local so that main data will not affect
                // If changed data already in list then remove it from headerToShow data
                // Else add this chaged data into headerToShow data
                // Now, Set new headers by setHeaderToShow
                // Set updated list according to changed headers by setCustomerDataForListing
                let localHeaderToShow = { ...headerToShow };
                if (Object.keys(localHeaderToShow).includes(label))
                  delete localHeaderToShow[label];
                else
                  localHeaderToShow[e.target.name] = allHeaders[e.target.name];
                setHeaderToShow(localHeaderToShow);
                setCustomerDataForListing(localHeaderToShow);
              }}
            />
          }
          label={label}
          color="primary"
        />
      </span>
    );
  };

  // Constructor
  useEffect(() => {
    fetchCustomerData(rowsPerPage, page);
  }, []);

  // Handling when customer data come by API response
  useEffect(() => {
    if (customerData) setCustomerDataForListing(headerToShow);
  }, [customerData]);

  // Handling when customer data come by API response
  useEffect(() => {
    if (deleteCustomerSuccess) {
      fetchCustomerData(rowsPerPage, page);
      dispatch(resetAddEditDeleteCustomer());
    }
  }, [deleteCustomerSuccess]);

  return (
    <>
      {/* Add Customer Button */}
      <div className={classes.rightAlign}>
        <Button
          className={classes.loginButton}
          onClick={() => {
            history.push("/admin/addEditCustomer");
          }}
        >
          Add Customer
        </Button>
      </div>
      {/* Filter */}
      <CustomerSearch
        setFilters={setFilters}
        fetchCustomerData={fetchCustomerData}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      <Card>
        {/* Table Headers with selection */}
        <CardHeader style={{ background: infoColor[0] }}>
          {/* <h4 className={classes.cardTitleWhite}>Customers</h4>
              <p className={classes.cardCategoryWhite}>
                Here is the list of all customers with filter
              </p> */}
          <div className={classes.headLabel}>Table Headers : </div>
          {allHeaders
            ? Object.keys(allHeaders).map((label) => {
                return renderTableHeaderOptionWithCheckbox(
                  label,
                  allHeaders[label]
                );
              })
            : ""}
        </CardHeader>
        <CardBody>
          {customerData && customerData.count + "" !== "0" ? (
            <>
              {/* Table List */}
              <Table
                tableHeaderColor="info"
                tableHead={Object.keys(headerToShow)}
                tableData={dataToShow}
              />
              {/* Pagination */}
              <CustomTablePagination
                filters={filters}
                customerData={customerData}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                onRowPageChange={fetchCustomerData}
                count={
                  customerData && customerData.count ? customerData.count : 0
                }
              />
            </>
          ) : (
            <h2>No Data Found</h2>
          )}
        </CardBody>
      </Card>
    </>
  );
}
