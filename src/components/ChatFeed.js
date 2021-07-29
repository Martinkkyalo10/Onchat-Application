import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    // destructure props chatfeed component/chat feed properties
    const { chats, activeChat, userName, messages } = props;

    // individual properties
    // if chats exists, then find chats then activeChat
    const chat = chats && chats[activeChat];

    // console.log(chat, userName, messages);

    // handle read receipts
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
        <div
            key={`read_${index}`}
            className="read_receipt"
            style={{
                float: isMyMessage ? 'right' : 'left',
                backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
            }}
        />
    ));

    // functional component for rendering messages
    const renderMessages = () => {

        // fetch all messages
        const keys = Object.keys(messages);

        // console.log(keys);

        // with access to keys, render messages

        return keys.map((key, index) => {

            // define a message - message with specific key
            const message = messages[key];

            // things to find out about message
            // a. if this was the last message sent 
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            // check of the index is = 0, return null else 
            //  return key of the last message 


            // b. if this is my message
            const isMyMessage = userName === message.sender.username;
            // is my message if the userName is equal to userName of the message sender

            // what to output

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            // render messages conditionally 
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
                        {/* if is my message render MyMesage component 
                    is not render their message*/}

                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        });
    };

    // what to check before rendering the chat
    if (!chat) {
        return <div />;
    } else {

        return (

            // ChatFeed
            // structure of the chat feed
            <div className="chat-feed">
                <div className="chat-title-container">
                    <div className="chat-title">{chat?.title}</div>
                    {/* if there is a chat, then access title variable */}

                    {/* use some dynamic logic to
                    -map through all the people
                    -get specific person and 
                    - return person's username as subtitle */}
                    <div className="chat-subtitle">
                        {chat.people.map((person) => ` ${person.person.username}`)}
                    </div>
                </div>
                {/* call render message function inside a dynamic logic */}

                {renderMessages()}
                {/* add space */}

                <div style={{ height: '100px' }} />

                {/* sending message */}
                <div className="message-form-container">
                    {/* render the MessageForm */}
                    <MessageForm {...props} chatId={activeChat} />
                </div>

            </div>
        );
    };

}

export default ChatFeed;