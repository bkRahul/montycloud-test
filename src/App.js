import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import NewsSearch from "./containers/NewsSearch/NewsSearch";
import NewsFeed from "./containers/NewsFeed/NewsFeed";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/feed" exact component={NewsFeed} />
          <Route path="/feed/:id" component={NewsFeed} />
          <Route path="/" exact component={NewsSearch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
