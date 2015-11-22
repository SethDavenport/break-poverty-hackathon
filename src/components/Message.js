import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

  _sendMessage = (e) => {
    e.stopPropagation();
    const messageText = this.refs.newMessage.value;
    this.props.sendMessage(this.props.personId, { message: messageText });
  }

  render() {
    const {
      props,
      _sendMessage,
    } = this;

    return (
      <div style={ styles.base }>
        <textarea style={ styles.textArea }
                  rows="3"
                  cols="30"
                  ref="newMessage"
                  onClick={ (e) => e.stopPropagation() }>
        </textarea>
        <div className="p1">
          <button style={ styles.button }
                  className="btn btn-primary"
                  type="button"
                  onClick={ _sendMessage }>
            Send
          </button>
          <Link style={ styles.historyLink }
                to={ `/person/${ props.personId }/history` }>
            Messages history
          </Link>
        </div>
      </div>
    );
  }
}


const styles = {
  base: {
  },
  textArea: {
    marginTop: 10,
  },
  historyLink: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#A276B7',
  },
};

export default Message;
