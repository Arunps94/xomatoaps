import React, { Component } from "react";
import "./details.css"
class MenuDisplay extends Component {
  orderId = [];

  addItem = (item) => {
    this.orderId.push(`${item}`);
    this.props.finalOrder(this.orderId);
    
  };

  removeItem = (item) => {
    this.orderId.splice(this.orderId.indexOf(item.toString()), 1);
    this.props.finalOrder(this.orderId);
  };

  renderCart = (orders) => {
    if (orders) {
      return orders.map((item, index) => {
        // console.log("orderCart", item.menu_name);
        return (
          <li className="list-group-item" key={index}>
           Order NO.: &nbsp;{item}
          </li>
        );
      });
    }
  };

  renderMenu = ({ menuData }) => {
    if (menuData) {
      return menuData.map((item) => {
        // console.log("renderMenu", item);
        return (
          <div key={item.menu_id}>
            <div className="col-md-12">
              <div className="card m-3 border-primary menuList">
                <div className="row g-0">
                  <div className="col-md-1 no"><h4 className="text-center">{item.menu_id}</h4></div>
                  <div className="col-md-4 menuImg "> 
                    <img
                      src={item.menu_image}
                      className="img-fluid rounded"
                      alt={item.menu_name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{item.menu_name}</h4>
                      <p className="card-text p">{item.description}</p>
                      <h5 className="card-text mt-1">₹{item.menu_price}</h5>
                    </div>
                  </div>
                  <div className="col-md-1  m-auto addbtn">
                    <button
                      className="btn round btn-primary"
                      onClick={() => {
                        this.addItem(item.menu_id);
                      }}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                    {/* {this.orderId.length.indexOf(item.toString())} */}
                    <button
                      className="btn round btn-primary"
                      onClick={() => {
                        this.removeItem(item.menu_id);
                      }}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    // console.log("render", this.renderCart(this.orderId.length));
    return (
      <>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Item Added</h1>
            </div>
            <ul className="list-group list-group-flush">
              {this.renderCart(this.orderId)}
            </ul>
          </div>
        </div>
        <div>{this.renderMenu(this.props)}</div>
      </>
    );
  }
}

export default MenuDisplay;
