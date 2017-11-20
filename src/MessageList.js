import React from 'react';
import Message from './Message';

const MessageList = ({
  messages,
  valueChangeFn
}) => {

  let makeMessage = messages.map(msg => <Message key={msg.id} message={msg} valueChangeFn={valueChangeFn}/>)

  return (
    <div>
      {makeMessage}
    </div>
  )
}

export default MessageList
