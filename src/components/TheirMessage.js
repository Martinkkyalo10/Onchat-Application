const TheirMessage = ({ lastMessage, message }) => {

    //  first message from the user
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;




    return (
        // structure of their message
        <div className="message-row">

            {isFirstMessageByUser && (
                <div
                    className="message-avator"
                    style={{ backgroundImage: message.sender && `url(${message.sender.avator})` }}
                />
            )}
            {message.attachments && message.attachments.length > 0
                ? (<img
                    src={message.attachments[0].file}
                    alt='message-attachment'
                    className='message-image'
                    style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                />
                ) : (
                    <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        {message.text}
                    </div>
                )}
        </div>
    );
};


export default TheirMessage;