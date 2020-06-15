import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Bilal</h5>
        <div className="card-image">
          <img
            alt="pic"
            src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red", opacity: 0.75 }}>
            favorite
          </i>
          <h6>title</h6>
          <p>This is amazing</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>

      <div className="card home-card">
        <h5>Bilal</h5>
        <div className="card-image">
          <img
            alt="pic"
            src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red", opacity: 0.75 }}>
            favorite
          </i>
          <h6>title</h6>
          <p>This is amazing</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>
    </div>
  );
};
export default Home;
