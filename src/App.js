import React from "react";
import { Link, Route, Switch } from "react-router-dom";
// import Home from "./components/Home";
import EditorTest from "./components/EditorTest";
import Page404 from "./components/Page404";
import Navbar from "./components/Navbar";
import "./css/App.css";

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/" component={EditorTest} exact />
        <Route path="/EditorTest" component={EditorTest} />
        <Route component={Page404} />
      </Switch>
    </main>
  );
}

export default App;
