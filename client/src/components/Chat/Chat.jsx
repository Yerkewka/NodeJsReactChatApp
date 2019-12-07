import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import io from 'socket.io-client';

// Custom components
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import UsersList from '../UsersList/UsersList';

// Styles
import './Chat.css';

let socket;
const Chat = ({ location, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = process.env.PORT || 'localhost:5000';

  useEffect(() => {
    const { name, room } = qs.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, ({ error }) => {
      if (error) {
        history.push('/');
      }
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ room, users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, ({ error }) => {
        if (!error) return setMessage('');

        history.push('/');
      });
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          onChange={e => setMessage(e.target.value)}
          sendMessage={sendMessage}
        />
      </div>
      <UsersList users={users} />
    </div>
  );
};

export default Chat;
