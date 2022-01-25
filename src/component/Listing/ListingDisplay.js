import React from "react";
import { Link } from "react-router-dom";

const ListingDisplay = (props) => {
  const renderData = ({ restData }) => {
    if (restData) {
      if (restData.length > 0) {
        return restData.map((item,index) => {
          return (
            <div className="card listBox " key={index}>
              <div className="row">
                <div className="col-lg-6 ">
                  <img
                    src={item.restaurant_thumb}
                    className="img-fluid rounded-start listImg"
                    alt={item.restaurant_name}
                  />
                </div>
                <div className="col-lg-6 ">
                  <div className="card-body md-body">
                    <h5 className="card-title text-danger">
                      {item.restaurant_name}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted">{item.address}</small>
                    </p>
                    <p>Ratings: {item.average_rating} Star</p>
                    <p> Cost: Rs {item.cost}/ 2persons</p>
                    <div>
                      <span className="badge bg-info m-1 text-light">
                        {item.cuisines[0].cuisine_name}
                      </span>
                      <span className="badge bg-success m-1 text-light ">
                        {item.cuisines[1].cuisine_name}
                      </span>
                      <span className="badge bg-primary m-1 text-light">
                        {item.mealTypes[0].mealtype_name}
                      </span>
                      <span className="badge bg-warning m-1 text-light">
                        {item.mealTypes[1].mealtype_name}
                      </span>
                      </div>
                    <div className=" d-flex justify-content-center">
                    <Link
                      className="btn btn-danger btnList"
                      to={`/details/${item.restaurant_id}`}
                    >
                      Order Now
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      } else {
        return <h3>No Data Found</h3>;
      }
    } else {
      return (
        <div className="text-center">
          <div className="spinner-border text-danger mt-5" role="status" style={{"width": "5rem", "height": "5rem"}}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
  };
  return <>{renderData(props)}</>;
};

export default ListingDisplay;
