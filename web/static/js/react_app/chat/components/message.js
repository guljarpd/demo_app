import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Styles
import 'css/react_app/components/message.scss';

const Message = ({avatar, name, message}) => {

    /**
     * @todo Refactor into url helper
     */
    const avatarUrl = `https://graph.facebook.com/${avatar}/picture?type=square`

    return (        
        <div className="message">
            <div className="avatar-img">
                <img height="50" width="50" src={""+avatarUrl} />
            </div>

            <div className="message-content" >
                <h5>{name.split(" ")[0]}</h5>
                <div><span>{message}</span></div>
            </div>
        </div>
    )
}

Message.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};
        
export default Message;