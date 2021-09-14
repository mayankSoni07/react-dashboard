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
import { addEditService } from "redux/actionCreators/service";
import { addEditServiceFields } from "variables/service/addEditService";
// import { getRandomNumber } from "utils/utilities";
// To get History context from contextAPI
import HistoryContext from "context/historyContext";
// Style
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/customer/customerStyle";
import loginStyles from "assets/jss/material-dashboard-react/views/loginStyle";
const useStyles = makeStyles({ ...styles, ...loginStyles });

// Fields to render
const renderFields = addEditServiceFields;

// Form Validation
const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

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
    </GridItem>
  </GridContainer>
);

// To render Select Dropdown Field
const renderSelectField = ({
  input,
  name,
  label,
  children,
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

const AddEditService = (props) => {
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
  // Query Params like customerId, serviceId
  const [queryParams, setQueryParams] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // Constructor
  useEffect(() => {
    // Extract customerId and serviceId from query params
    const urlSearchParams = new URLSearchParams(history.location.search);
    const searchParams = Object.fromEntries(urlSearchParams.entries());
    setQueryParams(searchParams);

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
  // const { addEditServiceData } = useSelector((state) => state.service);
  // useEffect(() => {
  //    console.log("addEditServiceData : ", addEditServiceData);
  // }, [addEditServiceData]);

  // OnSubmit form
  // API call to save service data
  const onSubmitForm = (values) => {
    let reqData = {};
    reqData["isEdit"] = isEdit;
    reqData["customerId"] = queryParams ? queryParams.customerId : "";
    reqData["values"] = values;

    if (queryParams && queryParams.customerId)
      reqData["values"]["customerId"] = queryParams.customerId;
    // if (queryParams && queryParams.serviceId)
    //   reqData["values"]["id"] = queryParams.serviceId;

    if (isEdit && editData) reqData["id"] = editData.id;

    addEditServiceFields.map((field) => {
      if (field.type === "number") {
        // When type Number : Adding bydefault value 0 in case of no value
        // When type Number : Adding value into number in case of value
        if (!reqData.values[field.key]) {
          reqData.values[field.key] = 0;
        } else {
          reqData.values[field.key] = parseInt(values[field.key]);
        }
      } else if (field.type === "date") {
        // When type Dare : Adding bydefault value to current date in case of no value
        if (
          !reqData.values[field.key] ||
          (reqData.values[field.key] &&
            reqData.values[field.key].trim().length === 0)
        ) {
          reqData.values[field.key] = new Date()
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-");
        }
      } else if (
        // Adding bydefault value NA in case of no value
        !reqData.values[field.key] ||
        (reqData.values[field.key] &&
          reqData.values[field.key].trim().length === 0)
      ) {
        // reqData.values[field.key] = "NA"; ToDo: handled in backend not required 
      }
    });
    dispatch(addEditService(reqData));
  };

  return (
    <>
      <div className={classes.rightAlign}>
        <Button
          variant="contained"
          className={classes.loginButton}
          style={{ marginBottom: "20px" }}
          onClick={() => history.goBack()}
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
                      sm={6}
                      md={6}
                    >
                      <Field
                        type={data.type}
                        name={data.key}
                        component={renderTextField}
                        label={data.label}
                        required={data.required}
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
                      sm={6}
                      md={6}
                    >
                      <Field
                        name={data.key}
                        label={data.label}
                        component={renderSelectField}
                        required={data.required}
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
              disabled={pristine || submitting || invalid}
              variant="contained"
              className={
                pristine || submitting || invalid
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
  form: "addEditService",
  validate
})(AddEditService);
