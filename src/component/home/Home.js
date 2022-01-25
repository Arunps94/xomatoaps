import React from "react";
import "./Home.css"
import Search from "./Search"
import QuickSearch from "./QuickSearch";
import Header from "../Header"
const Home = (props) => {
  // console.log("home props==>", props)
  return (
    <>
    <Header/>
    <Search/>
    <QuickSearch />
    </>   
  );
};

export default Home
