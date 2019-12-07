const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const userExist = users.find(u => u.name === name && u.room === room);

  if (userExist) {
    return { error: 'Username is taken', user: null };
  }

  const user = { id, name, room };
  users.push(user);

  return { error: null, user };
};

const removeUser = id => {
  const index = users.findIndex(u => u.id === id);
  if (index) users.splice(index, 1)[0];
};

const getUser = id => {
  return users.find(u => u.id === id);
};

const getUsersInRoom = room => {
  return users.filter(u => u.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
