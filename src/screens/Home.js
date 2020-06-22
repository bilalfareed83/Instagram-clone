import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/allPost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);
  return (
    <div className="home">
      {data.map((item, i) => {
        return (
          <div className="card home-card" key={i}>
            <h5>{item.postById.name}</h5>
            <div className="card-image">
              <img alt="pic" src={item.photo} />
            </div>
            <div className="card-content">
              <i
                className="material-icons"
                style={{ color: 'red', opacity: 0.75 }}
              >
                favorite
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
