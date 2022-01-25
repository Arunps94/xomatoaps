import React, { Component } from "react";
import QuickDisplay from "./QuickDisplay";
import  axios from "axios";

const mealUrl = "https://xomatoapsapi.herokuapp.com/mealType"

class QuickSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            MealTypes:""
        }
        // console.log("component")
    }
  render() {
    //   console.log("render",this.state.MealTypes)
    return (
      <div className="container">
        <h1 className="f_heading">Quick Searches</h1> <hr />
        <h4 className="f4_heading">Discover Restaurants By Type:</h4>
        <div className="container">
          <div className="row">
            <QuickDisplay quickData={this.state.MealTypes}/>
          </div>
        </div>
      </div>
    );
  }


 //api call 

    
   async componentDidMount() {
     const res = await axios.get(`${mealUrl}`)
     this.setState({MealTypes:res.data})
   }

}
export default QuickSearch;
