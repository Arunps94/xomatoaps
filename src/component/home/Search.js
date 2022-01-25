import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Home.css"

const locationUrl = "https://xomatoapsapi.herokuapp.com/location";
const restUrl = "https://xomatoapsapi.herokuapp.com/restaurants?city="

class Search extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      restaurants:""
    };
    // console.log("component")
  }
  
  renderCity = (data) =>{
      if(data){
      return data.map((item) =>{
          return (
              <option key={item.location_id} value={item.state_id}>
                 {item.state} 
              </option>
          )
      })}
  }

  renderRest=(data) => {
    if (data){
      return data.map((item) =>{
        return (
          <option key={item.restaurant_id} value={item.restaurant_id}>
            {item.restaurant_name} | {item.address}
          </option>
        )
      })
    }
  }



  handleRest = (event) => {
    // console.log("handleRest",event.target.value);
    fetch(`${restUrl}${event.target.value}`,{method: 'GET'})
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({restaurants:data})
    })
  }

  handleDetails = (event) => {
    // console.log("handleDetails-->",this.props)
    this.props.history.push(`/details/${event.target.value}`);
  }

  render() {
      // console.log("render",this.state.locations)
    return (
      <div className="backgd ">
        <div className="container">
        <div className="row">
         <Link to="/"><div className="col-4 align-self-center" id="logo">
             <span>X!</span> 
          </div></Link> 
        </div>
        <div className="row ">
          <div className="col-4 align-self-center bg-danger" id="heading">
            Find The Best Place Near You
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-5">
          <select className="form-select col-4 " onChange={this.handleRest}>
            <option>SELECT CITY</option>
            {this.renderCity(this.state.locations)}
            {/* {console.log("locations updated", this.renderCity(this.state.locations) )} */}
          </select>
          <select className="form-select col-4" onChange={this.handleDetails}>
          <option>SELECT RESTAURANTS </option>
            {this.renderRest(this.state.restaurants)}
          </select>
        </div>
        </div>
      </div>
    );
  }

  //call location api method componentDidMount
  componentDidMount() {
    // console.log("method")
    fetch(locationUrl,{method:'GET'})
    .then((res)=>res.json())
    .then((data)=>{
        this.setState({locations:data});
    })
  }
}

export default withRouter(Search);
