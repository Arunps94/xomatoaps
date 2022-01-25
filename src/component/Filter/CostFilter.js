import React, { Component } from "react";
import axios from "axios";

const costUrl = "https://xomatoapsapi.herokuapp.com/filter";

class CostFilter extends Component {
  handlecostFilter = (event) => {
    let costId = sessionStorage.getItem("mealId");
    let cost = event.target.value.split("-");
    let lcost = cost[0];
    let hcost = cost[1];
    let filterUrl;
    if (event.target.value === " ") {
      filterUrl = `${costUrl}/${costId}`;
    } else {
      filterUrl = `${costUrl}/${costId}?lcost=${lcost}&hcost=${hcost}`;
    }
    axios.get(filterUrl).then((res) => {
      this.props.restPerCost(res.data);
    });
  };

  render() {
    return (
      <>
        <center>
          <h5>Cost Filter</h5>
        </center>
        <div className="cuisinesFilter" onChange={this.handlecostFilter}>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cost"
                value=""
              />
              All
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input "
                type="radio"
                name="cost"
                value="100-300"
              />
              100-300
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cost"
                value="301-500"
              />
              301-500
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cost"
                value="501-700"
              />
              501-700
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input nav-item"
                type="radio"
                name="cost"
                value="701-1500"
              />
              701-1500
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default CostFilter;
