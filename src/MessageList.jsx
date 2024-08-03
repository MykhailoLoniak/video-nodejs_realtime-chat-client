import { formatDistanceToNow } from 'date-fns';

export const MessageList = ({ messages }) => {
  return (
    <ul className="messageUl">
      {messages.map(message => (
        <li key={`${message.time}+${message.text}`} className="messageItem">
          {message.text}
          <br />
          <span className='author'>
            {message.author},{' '}
            {formatDistanceToNow(new Date(message.time), { addSuffix: true })}
          </span>
        </li>
      ))}
    </ul>
  )
};
