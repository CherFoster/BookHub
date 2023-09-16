import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./Signup";

function App() {
  return (
    <>
      <h1>Phase 4 Project Client</h1>
      <Switch>
        <Route path="/signup" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
