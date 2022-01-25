import React, { Component } from "react";
import "./Filter.css";
import axios from "axios";

const cuisinesUrl = "https://xomatoapsapi.herokuapp.com/filter";

class CuisineFilter extends Component {

    cuisinesFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let filterUrl;
        if(cuisineId === ""){
            filterUrl = `${cuisinesUrl}/${mealId}`
        }else{
            filterUrl = `${cuisinesUrl}/${mealId}?cuisine=${cuisineId}`
        }
        axios.get(filterUrl)
        .then((res)=>{this.props.restPerCuisine(res.data)})
    }

  render() {
    return (
      <>
        <center>
          <h5>Cuisine Filter</h5>
        </center>
        
        <div className="cuisinesFilter flex-column" onChange={this.cuisinesFilter}>
          <div className="form-check nav-item ">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value=""
              />
              All
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input nav-item"
                type="radio"
                name="cuisine"
                value="1"
              />
              North Indian
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="2"
              />
              South Indian
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="3"
              />
              Chinese
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="4"
              />
              Fast Food
            </label>
          </div>
          <div className="form-check nav-item">
            <label class="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="5"
              />
              Street Food
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default CuisineFilter;
