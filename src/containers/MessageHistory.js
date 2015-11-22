import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as messageActions from '../actions/messages';
import * as peopleActions from '../actions/people';
import Radium from 'radium';
import moment from 'moment';

// subscribe to store
function mapStateToProps(state) {
  return {
    messages: state.messages.get('messages').toJS(),
    userId: state.router.params.userId,
    person: state.people.get('peopleList') ?
      state.people.get('peopleList').toJS().find(person => person._id === state.router.params.userId) :
      null,
  };
}

// make props that are in fact action creators.
function mapDispatchToProps(dispatch) {
  return {
    getMessagesForPerson: id => dispatch(messageActions.getMessagesForPerson(id)),
    getPeople: () => dispatch(peopleActions.getPeople()),
  };
}

let refreshIntervalId;

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class MessageHistory extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    getMessagesForPerson: PropTypes.func.isRequired,
    getPeople: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPeople();

    this.props.getMessagesForPerson(this.props.userId);

    // Yuck: hack.
    refreshIntervalId = window.setInterval(() => this.props.getMessagesForPerson(this.props.userId), 5000);
  }

  componentWillUnmount() {
    window.clearInterval(refreshIntervalId);
  }

  render() {
    const { props } = this;
    const items = props.messages && props.messages[props.userId] ?
      props.messages[props.userId] :
      null;
    const name = props.person ? props.person.name : '';
    const sms = props.person ? props.person.sms : '';
    const rows = items ? items.map((message, index) => {
      return (
        <div key={index} style={ styles.bubble(message.incoming) }>
          <div>{message.text}</div>
          <div style={ styles.dateStamp(message.incoming) }>
            { moment(message.date).fromNow() }
          </div>
        </div>
      );
    }) : 'No messages found';

    return (
      <div className="m2 border sm-col-12">
        <h1 className="p1 border-bottom">
          Message History for { name } ({ sms })
        </h1>
        <div style={ styles.messageContainer } className="mt1 mr1 ml1 mb2">
          { rows }
        </div>
      </div>
    );
  }
}

const styles = {
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  bubble: incoming => {
    return {
      border: 'solid #DDD 1px',
      borderRadius: '7px',
      alignSelf: incoming ? 'flex-start' : 'flex-end',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '10px',
      paddingRight: '10px',
      margin: '5px',
      background: incoming ? '#EEE' : '#0074d9',
      color: incoming ? 'black' : 'white',
    };
  },
  dateStamp: incoming => {
    return {
      color: incoming ? 'gray' : 'white',
      fontSize: '10px',
      textAlign: 'right',
    };
  },
};

export default MessageHistory;
