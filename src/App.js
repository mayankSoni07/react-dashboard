import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Login from "views/Login/login";
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

// core views
// import AddEditCustomer from "views/Customer/AddEditCustomer";

export default function App() {
  let isLoggedIn = false;
  if (localStorage.getItem("token")) isLoggedIn = true;
  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            {/* <Route path="/admin/addEditCustomer" component={AddEditCustomer} /> */}
            <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} />
            <Route exact={true} path="/" component={Admin} />
            <Route path="/login">
              <Redirect to="/admin/dashboard" />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
