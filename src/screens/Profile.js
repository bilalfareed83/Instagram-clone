import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userPhoto, setUserPhoto] = useState([]);

  useEffect(() => {
    fetch('/myPosts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserPhoto(result);
      });
  }, []);
  return (
    <div style={{ width: '800px', margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0px ',
        }}
      >
        <div
          style={{
            flex: '2',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            alt="pic"
            src="https://images.unsplash.com/photo-1562124638-724e13052daf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>

        <div style={{ flex: '3' }}>
          <h4> {state ? state.name : 'loading...'} </h4>
          <div style={{ display: 'flex' }}>
            <h6 style={{ flex: '1' }}>4 posts</h6>
            <h6 style={{ flex: '1' }}>6 followers</h6>
            <h6 style={{ flex: '1' }}>6 following</h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="gallery">
        {userPhoto.map((photo, i) => {
          return (
            <img
              key={i}
              className="item"
              alt="pic"
              src={photo.photo}
              style={{ margin: '5px' }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
