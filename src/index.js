import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
const App = () => {
  return (
    <div>
        <Header/>
      <h1>Welcome</h1>
        <h2>Welcome to</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
