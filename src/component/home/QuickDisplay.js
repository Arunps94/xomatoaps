import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

const QuickDisplay = (props) => {
  const renderMeal = ({ quickData }) => {
    if (quickData) {
      return quickData.map((item) => {
        return (
          <Link
            to={`/list/${item.mealtype_id}`}
            key={item.mealtype_id}
            className="col-lg-4 col-md-6 col-xm-8"
          >
            <div className="card box">
              <div className="row g-0">
                <div className="col-lg-6  col-xm-10">
                  <img
                    src={item.meal_image}
                    alt={item.mealtype}
                    className="img-fluid rounded-start imgBox"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{item.mealtype}</h5>
                    <p className="card-text">
                      <small className="text-muted">{item.content}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  return <>{renderMeal(props)}</>;
};

export default QuickDisplay;
