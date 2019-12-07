import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

// Custom components
import Message from '../Message/Message';

// Styles
import './Messages.css';

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, idx) => (
        <div key={idx}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
