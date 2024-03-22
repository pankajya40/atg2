import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleUserClick = (index) => {
    setSelectedUserIndex(index);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="text-center my-5 fw-bold">Users List</h1>
      <div className="px-4">
        {isLoading ? (
          <div className="ps-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : users.length ? (
          <ul>
            {users.map((user, index) => (
              <li
                key={index}
                onClick={() => handleUserClick(index)}
                className="row align-items-center justify-content-between border list-shadow p-4"
              >
                <div className="col-md-4">
                  <img
                    width="50"
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle"
                  />
                  <span className="ms-3">
                    {user.profile.firstName} {user.profile.lastName}
                  </span>
                </div>

                <div className="col-md-7 ms-md-5">
                  {selectedUserIndex === index ? (
                    <div className="effect">
                      <div className="d-md-flex">
                        <div className="d-flex align-items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-1"
                          />
                        </div>
                        <div className="ms-md-4 mt-3">
                          <h6>
                            <span className="fw-bold">Name: </span>
                            {user.profile.firstName} {user.profile.lastName}
                          </h6>
                          <p>
                            <span className="fw-bold">Job Title: </span>
                            {user.jobTitle}
                          </p>
                          <p>
                            <span className="fw-bold">Username: </span>
                            {user.profile.username}
                          </p>
                          <p>
                            <span className="fw-bold">Email: </span>
                            {user.profile.email}
                          </p>
                          <p>
                            <span className="fw-bold">Bio: </span>
                            {user.Bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No data to show</div>
        )}
      </div>
    </div>
  );
}

export default App;
