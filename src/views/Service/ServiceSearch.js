/*eslint-disable*/
import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { addEditServiceFields } from "variables/service/addEditService";
// import { getRandomNumber } from "utils/utilities";
// Style
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/customer/customerStyle";
import loginStyles from "assets/jss/material-dashboard-react/views/loginStyle";
const useStyles = makeStyles({ ...styles, ...loginStyles });

// Fields to render
const renderFields = addEditServiceFields;

// To render Input Field
const renderTextField = ({
  type,
  input,
  label,
  meta: { touched, error },
  className,
  ...custom
}) => (
  <GridContainer>
    <GridItem xs={6} sm={5} md={5}>
      {label}
    </GridItem>
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
  className,
  ...custom
}) => (
  <GridContainer>
    <GridItem xs={6} sm={5} md={5}>
      {label}
    </GridItem>
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

const ServiceSearch = (props) => {
  const classes = useStyles();
  const {
    setFilters,
    fetchCustomerData,
    rowsPerPage,
    page,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props;

  // OnSubmit form
  // API call to save service data
  const onSubmitForm = (values) => {
    let filters = "";
    values &&
      Object.keys(values).map((key, index) => {
        if (values[key] && values[key].trim().length > 0) {
          if (index === 0)
            filters = filters + key + ".eq~" + values[key].trim();
          else filters = filters + "___" + key + ".eq~" + values[key].trim();
        }
      });
    if (filters && filters.length > 0) {
      setFilters(filters);
      fetchCustomerData(rowsPerPage, page, filters);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={`${classes.headLabel} ${classes.mb20}`}>
        Table Filters :{" "}
      </div>
      <GridContainer>
        {renderFields
          ? renderFields.map((data) => {
              if (data.component === "textField")
                return (
                  <GridItem
                    // key={`${data.key}-${getRandomNumber()}`}
                    style={{ marginBottom: "20px" }}
                    xs={12}
                    sm={4}
                    md={4}
                  >
                    <Field
                      type={data.type}
                      name={data.key}
                      component={renderTextField}
                      label={data.label}
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
                    sm={4}
                    md={4}
                  >
                    <Field
                      name={data.key}
                      label={data.label}
                      component={renderSelectField}
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
            disabled={pristine || submitting}
            variant="contained"
            className={
              pristine || submitting
                ? classes.loginButtonDisabled
                : classes.loginButton
            }
          >
            Search
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
          onClick={() => {
            reset();
            fetchCustomerData(rowsPerPage, page);
          }}
        >
          Clear Values
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "serviceSearch"
})(ServiceSearch);
