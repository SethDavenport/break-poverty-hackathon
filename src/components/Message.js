import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/people';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: (id, message) => dispatch(peopleActions.messagePerson(id, message)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Message extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  _sendMessage = () => {
    const messageText = this.refs.newMessage.value;
    this.props.sendMessage(this.props.personId, { message: messageText });
  }

  render() {
    const {
      _sendMessage,
    } = this;

    return (
      <div style={ styles.base }>
        <textarea rows="3"
                  cols="30"
                  ref="newMessage">
        </textarea>
        <div className="p1">
          <button style={ styles.button }
                  className="btn btn-primary"
                  type="button"
                  onClick={ _sendMessage }>
            Send
          </button>
        </div>
      </div>
    );
  }
}


const styles = {
  base: {
  },
  button: {
    backgroundColor: '#A276B7',
  },
};

export default Message;
