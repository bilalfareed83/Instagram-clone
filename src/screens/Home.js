import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/allPost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result);
      });
  }, []);

  const likesPost = (id) => {
    fetch('/likes', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postById: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const unlikesPost = (id) => {
    fetch('/unLikes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postById: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const makeComment = (text, postById) => {
    fetch('/comment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        text,
        postById,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const deletePost = (postId) => {
    fetch(`/deletPost/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="home">
      {data.map((item, i) => {
        console.log(item);
        return (
          <div className="card home-card" key={i}>
            <h5>
              {item.postById.name}{' '}
              {item.postById._id == state._id && (
                <i
                  className="material-icons"
                  style={{ cursor: 'pointer', float: 'right' }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>

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
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ cursor: 'pointer' }}
                  onClick={() => unlikesPost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ cursor: 'pointer' }}
                  onClick={() => likesPost(item._id)}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>

              <h6>{item.title}</h6>
              <p>{item.body}</p>

              {item.comments.map((comment, i) => {
                // console.log(comment.text);
                return (
                  <h6 key={i}>
                    <span style={{ fontWeight: 'bold' }}>
                      {comment.postById.name}:{' '}
                    </span>{' '}
                    {comment.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  makeComment(e.target[0].value, item._id);

                  e.target[0].value = '';
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
