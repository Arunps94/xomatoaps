import React, { Component } from "react";
import axios from "axios";

const sortUrl = "https://xomatoapsapi.herokuapp.com/filter";

class SortFilter extends Component {
  handlesortFilter = (event) => {
    let sortId = sessionStorage.getItem("mealId");
    let sort = event.target.value;
    let filterUrl = `${sortUrl}/${sortId}?sortKey=${sort}`;
    axios.get(filterUrl).then((res) => {
      this.props.restPerSort(res.data);
    });
  };

  render() {
    return (
      <>
        <center>
          <h5>Sort Filter</h5>
        </center>
        <div className="cuisinesFilter" onChange={this.handlesortFilter}>
          <div className="form-check">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                value="-1"
              />
              High to Low
            </label>
          </div>
          <div className="form-check">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                value="1"
              />
              Low to High
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default SortFilter;
