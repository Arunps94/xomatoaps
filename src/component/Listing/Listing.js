import axios from "axios";
import React, { Component } from "react";
import "./Listing.css";
import ListingDisplay from "./ListingDisplay";
import CuisineFilter from "../Filter/CuisineFilter";
import CostFilter from "../Filter/CostFilter";
import SortFilter from "../Filter/SortFilter";
import Header from "../Header";

const listUrl = "https://xomatoapsapi.herokuapp.com/filter";

class Listing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restList: "",
    };
  }

  setDataPerFilter = (data) => {
    this.setState({ restList: data });
  };

  render() {
    return (
      <>
        <Header />
        
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-2 col-lg-2 d-md-block sidebar collapse border border-danger rounded mx-2 mt-4"
            >
              <h3 className="text-center border-bottom border-danger">Filters</h3>
              <div className="position-sticky pt-3">

                <div className="nav flex-column">
                  <CuisineFilter
                    mealId={this.props.match.params.id}
                    restPerCuisine={(data) => {
                      this.setDataPerFilter(data);
                    }}
                  />
                </div>
                <div className="nav flex-column">
                  <CostFilter
                    restPerCost={(data) => {
                      this.setDataPerFilter(data);
                    }}
                  />
                </div>
                <div className="nav flex-column">
                  <SortFilter
                    restPerSort={(data) => {
                      this.setDataPerFilter(data);
                    }}
                  />
                </div>
              </div>
            </nav>
            <div className="col-md-6 m-auto col-lg-9 px-md-4 ">
              <ListingDisplay restData={this.state.restList} />
            </div>
          </div>
        </div>
      </>
    );
  }

  async componentDidMount() {
    const mealId = this.props.match.params.id;
    sessionStorage.setItem("mealId", mealId);
    const res = await axios.get(`${listUrl}/${mealId}`);
    this.setState({ restList: res.data });
  }
}

export default Listing;
