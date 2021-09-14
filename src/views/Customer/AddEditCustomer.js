/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  addEditCustomer,
  resetAddEditDeleteCustomer
} from "redux/actionCreators/customer";
import { addEditCustomerFields } from "variables/customer/addEditCustomer";
// import { getRandomNumber } from "utils/utilities";
// To get History context from contextAPI
import HistoryContext from "context/historyContext";
// Style
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/customer/customerStyle";
import loginStyles from "assets/jss/material-dashboard-react/views/loginStyle";
const useStyles = makeStyles({ ...styles, ...loginStyles });

// CSS for Field error
const fieldError = {
  fontSize: "12px",
  fontWeight: "400",
  color: "red"
};

// Fields to render
const renderFields = addEditCustomerFields;

// To render Input Field
const renderTextField = ({
  type,
  input,
  label,
  meta: { touched, error },
  required,
  className,
  ...custom
}) => (
  <GridContainer>
    <GridItem xs={6} sm={5} md={5}>{`${label} ${
      required ? "*" : ""
    }`}</GridItem>
    <GridItem xs={6} sm={7} md={7}>
      <TextField
        type={type}
        className={className}
        placeholder={label}
        errortext={`${touched && error}`}
        {...input}
        {...custom}
      />
      {touched && error && <span style={fieldError}>{error}</span>}
    </GridItem>
  </GridContainer>
);

// To render Select Dropdown Field
const renderSelectField = ({
  input,
  name,
  label,
  children,
  meta: { touched, error },
  required,
  className,
  ...custom
}) => (
  <GridContainer>
    <GridItem xs={6} sm={5} md={5}>{`${label} ${
      required ? "*" : ""
    }`}</GridItem>
    <GridItem xs={6} sm={7} md={7}>
      <Select
        className={className}
        native
        {...input}
        {...custom}
        inputProps={{
          name: name,
          id: name
        }}
      >
        {children}
      </Select>
      {touched && error && <span style={fieldError}>{error}</span>}
    </GridItem>
  </GridContainer>
);

// To render options in select dropdown
const renderOptionDropdown = (optionData) => {
  return (
    <option
      // key={`${optionData.value}-${getRandomNumber()}`}
      value={optionData.value}
    >
      {optionData.label}
    </option>
  );
};

const AddEditCustomer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // To get History context from contextAPI
  const history = useContext(HistoryContext);
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    invalid,
    initialize
  } = props;

  // Local state
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // Constructor
  useEffect(() => {
    // Edit Case : Initialize data with prefilled values
    if (history && history.location && history.location.state) {
      setIsEdit(true);
      setEditData(history.location.state);
      let editData = history.location.state;
      let obj = {};
      renderFields.map((fieldData) => {
        obj[fieldData.key] =
          editData[fieldData.key] + "" ? editData[fieldData.key] + "" : "";
      });
      initialize(obj);
    } else {
      let obj = {};
      renderFields.map((fieldData) => {
        obj[fieldData.key] =
          fieldData.defaultValue || fieldData.defaultValue + "" === "false"
            ? fieldData.defaultValue
            : "";
      });
      initialize(obj);
    }
  }, []);

  // Submit API call response handler
  const { addEditCustomerData } = useSelector((state) => state.customer);
  useEffect(() => {
    if (addEditCustomerData) {
      dispatch(resetAddEditDeleteCustomer());
      history.push("./customer");
    }
  }, [addEditCustomerData]);

  // OnSubmit form
  // API call to save customer data
  const onSubmitForm = (values, a, b, c, d) => {
    if (!pristine) {
      let reqData = {};
      reqData["values"] = values;
      reqData["isEdit"] = isEdit;
      if (isEdit && editData) reqData["id"] = editData.id;
      // Adding bydefault value NA in case of no value
      values &&
        Object.keys(values).map((key) => {
          if (
            !reqData.values[key] ||
            (reqData.values[key] && reqData.values[key].trim().length === 0)
          ) {
            // reqData.values[key] = "NA";  ToDo: handled in backend
          }
        });
      dispatch(addEditCustomer(reqData));
    }
  };

  return (
    <>
      <div className={classes.rightAlign}>
        <Button
          variant="contained"
          className={classes.loginButton}
          style={{ marginBottom: "20px" }}
          onClick={() => {
            history.push("./customer");
          }}
        >
          Go Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <GridContainer>
          {renderFields
            ? renderFields.map((data) => {
                if (data.component === "textField")
                  return (
                    <GridItem
                      // key={`${data.key}-${getRandomNumber()}`}
                      style={{ marginBottom: "20px" }}
                      xs={12}
                      sm={3}
                      md={4}
                    >
                      <Field
                        type={data.type}
                        name={data.key}
                        component={renderTextField}
                        label={data.label}
                        required={data.required}
                        validate={data.validate ? data.validate : []}
                        className={classes.fullWidth}
                      />
                    </GridItem>
                  );
                else if (data.component === "select")
                  return (
                    <GridItem
                      // key={`${data.key}-${getRandomNumber()}`}
                      style={{ marginBottom: "20px" }}
                      xs={12}
                      sm={3}
                      md={4}
                    >
                      <Field
                        name={data.key}
                        label={data.label}
                        component={renderSelectField}
                        required={data.required}
                        validate={data.validate ? data.validate : []}
                        className={classes.fullWidth}
                      >
                        <option value={""}>Select</option>
                        {data.options
                          ? data.options.map((optionData) => {
                              return renderOptionDropdown(optionData);
                            })
                          : ""}
                      </Field>
                    </GridItem>
                  );
              })
            : ""}
        </GridContainer>

        {/* Buttons */}
        <div style={{ marginTop: "20px" }}>
          <span style={{ marginRight: "20px" }}>
            <Button
              type="submit"
              disabled={submitting || invalid}
              variant="contained"
              className={
                submitting || invalid
                  ? classes.loginButtonDisabled
                  : classes.loginButton
              }
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          </span>
          <Button
            type="button"
            disabled={pristine || submitting}
            variant="contained"
            className={
              pristine || submitting
                ? classes.loginButtonDisabled
                : classes.loginButton
            }
            onClick={reset}
          >
            Clear Values
          </Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "addEditCustomer"
})(AddEditCustomer);
