import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((rev, index) => (
        <div
          key={rev._id || index} // Use index as the key if _id is undefined
          className="card text-white bg-primary mb-3 mr-4"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{rev.name}</span>
            <span>
              <StarRating rating={rev.rating}></StarRating>
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{rev.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
