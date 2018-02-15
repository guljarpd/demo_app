import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Views
import LeftNav from './left_nav';
import Modal from './modal';
import AddChannelForm from './add_channel_form';
import ChannelView from './channel_view';

// Selectors
import { getCurrentUser, getModalVisible, getModalErrors, getActiveChannelId} from '../reducers/index';

// Actions
import * as channelActions from '../actions/channel';
import * as channelMessageActions from '../actions/channel_message';

//Styles
import 'css/react_app/chat_layout.scss';
import 'css/react_app/components/modal.scss';

//lodash
import {isNil} from 'lodash';


class ChatLayout extends React.Component{
    constructor(){
        super();
    }

    componentDidUpdate(){
        const {fetchChannelMessages, modalVisible} = this.props;
        
        // Fetch messages if we aren't showing the modal
        if(!modalVisible){
            fetchChannelMessages();
        }    
    }

    render(){
        const {
            modalVisible,
            modalErrors,
            cancelAddChannel,
            createAddChannel,
            activeChannelId
        } = this.props;


        return (
            <div>
                <div className="chat-layout">
                    <LeftNav />

                    <div className="right-container">
                        { isNil(activeChannelId) 
                            ? <div className="empty">Create a channel to join</div>
                            : <ChannelView />
                        }
                    </div>
                </div>
                
                { modalVisible &&
                    <Modal>
                        <AddChannelForm 
                            onCancelClick = {cancelAddChannel} 
                            onCreateClick = {createAddChannel}
                            errors = {modalErrors}
                        />
                    </Modal>
                }
           </div>
        )
    }

}


ChatLayout.propTypes = {
    current_user: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    modalErrors: PropTypes.object.isRequired,
    cancelAddChannel: PropTypes.func.isRequired,
    activeChannel: PropTypes.number
}

ChatLayout.defaultProps = {

}

const mapStateToProps = (state) => {
    return {
        current_user: getCurrentUser(state),
        modalVisible: getModalVisible(state),
        modalErrors: getModalErrors(state),
        activeChannelId: getActiveChannelId(state)
    };
}

const actions = {...channelActions,...channelMessageActions}

ChatLayout = connect(
    mapStateToProps,
    actions
)(ChatLayout);

export default ChatLayout
