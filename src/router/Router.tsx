import React, {FC} from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import PageApplications from "../pages/PageApplications";
import PageFiles from "../pages/PageFiles";
import PageHome from "../pages/PageHome";

const Router: FC = ({children}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/applications">
          <PageApplications/>
        </Route>
        <Route path="/files">
          <PageFiles/>
        </Route>
        <Route path="/">
          <PageHome/>
        </Route>
      </Switch>
      {children}
    </BrowserRouter>
  )
}

export default Router
