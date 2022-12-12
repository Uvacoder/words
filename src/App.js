import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/navbar";
import { Route } from "wouter";
import Home from "./components/home";
import Wordlist from "./components/wordlist";

import "./global.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Route path="/" component={Home} />
        <Route path="/wordlist" component={Wordlist} />
      </div>
    );
  }
}
export default App;
