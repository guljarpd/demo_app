import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Views
import ChannelHeader from './channel_header';
import ChannelItem from './channel_item';
import CustomScroll from 'react-custom-scroll';

// Actions
import * as channelActions from '../actions/channel';

// Reducers
import { getChannels, getActiveChannelId, getCurrentUser } from '../reducers/index';

// Styles
import 'css/react_app/components/left_nav.scss';

class LeftNav extends React.Component{
    constructor(){
        super();
    }
    
    componentDidMount() {
        const {subscribeToChannelList} = this.props
        
        this.fetchData();
        subscribeToChannelList()
    }

    fetchData() {
        const { fetchChannels, subscribeToChannels } = this.props
        fetchChannels().then(()=>subscribeToChannels());
    }

    render(){
        const { 
                addChannel, 
                selectChannel, 
                channels,
                activeChannelId,
                currentUser
              } = this.props


        return (
            <div className="left-container container-fluid ">
                <div className="row">
                    <div className="container-fluid log-out">
                        <a href="/auth/logout">Log Out</a>
                    </div>
                </div>


                <div className="current-user-container">
                    <div className="avatar">
                        <img height="50" width="50"  src={""+currentUser.avatar}/>
                    </div>

                    <div className="current-user-name">
                        <span>{currentUser.name.split(" ")[0]}</span>
                    </div>                 
                </div>

                <div className="channel-container row">
                    <ChannelHeader onAddChannelClick = { addChannel }/>

                    <div className="channel-list">                      
                            <div className="col-12">
                                <CustomScroll flex="1" keepAtBottom={true}>
                                    <ul>
                                        {
                                            channels.map((channel)=> 
                                                <ChannelItem 
                                                    key={channel.id} 
                                                    onClick={selectChannel} 
                                                    channel={channel}
                                                    activeChannelId={activeChannelId} 
                                                />)
                                        }
                                    </ul>
                                </CustomScroll>
                            </div>                   
                    </div>
                </div>
            </div>
        )
    }

}


LeftNav.propTypes = {
    channels: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired
}

LeftNav.defaultProps = {
}

const mapStateToProps = (state) => {
    return {
        channels: getChannels(state),
        activeChannelId: getActiveChannelId(state),
        currentUser: getCurrentUser(state)
    };
}


LeftNav= connect(
    mapStateToProps,
    channelActions
)(LeftNav);


export default LeftNav