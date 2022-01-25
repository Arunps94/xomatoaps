import React, { Component } from "react";
import "./orders.css";
import Header from "../Header";
import { Link } from 'react-router-dom';

const menuItemURL = "https://xomatoapsapi.herokuapp.com/menuItem";
const placeOrderURL = "https://xomatoapsapi.herokuapp.com/placeOrder";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Math.floor(Math.random() * 100000),
      rest_name: this.props.match.params.restName,
      name: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(',')[0] : '',
      phone: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(',')[2] : '',
      email: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(',')[1] : '',
      cost: 0,
      address: '',
      menuItems: ''
    };
  }

  handleSubmit = () => {
    // var obj = this.state;
    // obj.details = sessionStorage.getItem("menu");
    // delete obj.menuItems;
    //   console.log('object',obj);
    fetch(placeOrderURL, {
      method: "POST",
      headers: {
        'accept': "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      // .then(this.props.history.push('/viewBooking'))
      .then(console.log('going for payment'));
  };

  renderItems = (data) => {
    if (data) {
      return data.map((item, index) => {
        // console.log("render item",item);
        return (
          <div key={index} className=" col-md-12 mb-2 border menuitems">
            <div className="row g-0">
              <div className="col-md-4 itemImg">
                <img src={item.img} className="img-fluid rounded" alt={item.name} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title title">{item.name}</h5>
                </div>
              </div>
              <h5 className="mt-2 itemPrice">₹{item.price}</h5>
            </div>
          </div>
        );
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // console.log('render>>', this.state)
    if (localStorage.getItem('ltk') == null) {
      return (
        <>
          <Header />
          <h5 className="text-center">
          First
            < Link to="/login" className="text-dark m-2">Login</Link>
            OR
            <Link to="/register" className="text-dark m-2">Register</Link>
             to Place Order</h5>
        </>)

    } else {
      return (
        <>
          <Header />
          <div className="container">
            <br />
            <div className="card border-danger mb-3">
              <div className="card-header bg-danger text-white"><h3>Place Order</h3></div>
              <div className="card-body ">
                <form action="https://xpaytmapi.herokuapp.com/paynow" method="POST"> 
                {/*https://lpaytmapi.herokuapp.com  */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6  mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Name"
                              value={this.state.name}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6  mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6  mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              placeholder="Phone"
                              value={this.state.phone}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6  mb-3">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              placeholder="Address"
                              value={this.state.address}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border-danger mb-3">
                    <div className="card-header bg-danger text-white"><h4>{this.state.rest_name}</h4></div>
                    {this.renderItems(this.state.menuItems)}
                    <input type="hidden" name="cost" value={this.state.cost} />
                    <input type="hidden" name="id" value={this.state.id} />
                    <input type="hidden" name="rest_name" value={this.state.rest_name} />
                    <div className=" border">
                      <h4 className="card-title ms-4">Total <span className="cost">₹{this.state.cost}</span></h4>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-success m-2" onClick={this.handleSubmit} type="submit" >
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  componentDidMount() {
    // console.log("sessionStorage>>", sessionStorage.getItem('menu'))
    let menuItems = sessionStorage.getItem("menu");
    let menuIds = [];
    menuItems.split(",").map((item) => {
      menuIds.push(parseInt(item));
      return "ok";
    });
    fetch(menuItemURL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(menuIds),
    })
      .then((res) => res.json())
      .then((data) => {
        let menuDetails = [];
        let totalPrice = 0;
        data.map((item) => {
          var myObj = {};
          totalPrice = totalPrice + parseInt(item.menu_price);
          myObj.name = item.menu_name;
          myObj.img = item.menu_image;
          myObj.price = item.menu_price;
          menuDetails.push(myObj);
          return "ok";
        });
        this.setState({ cost: totalPrice, menuItems: menuDetails });
      });
    console.log("menuItems", menuItems)
  }
}

export default PlaceOrder;
