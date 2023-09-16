import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Signup from "./Signup";

function App() {

  return (
    <BrowserRouter>
      <Link to="/signup"></Link> 

      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

export default App;
