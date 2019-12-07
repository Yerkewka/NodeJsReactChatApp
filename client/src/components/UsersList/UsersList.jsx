import React from 'react';

// Styles
import './UsersList.css';

const UsersList = ({ users }) => {
  return (
    <div className="usersListContainer">
      <h4>Room members: </h4>
      <ul className="usersList">
        {users.map((user, idx) => (
          <li key={idx} className="usersListItem">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
