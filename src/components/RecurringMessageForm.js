// import React, { Component, PropTypes } from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import * as peopleActions from '../actions/people';

function mapStateToProps(state) {
  return state;
}

// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

// @connect(mapStateToProps, mapDispatchToProps)
@connect(mapStateToProps)
class RecurringMessageForm extends Component {
  // static propTypes = {
  // };

  // _sendMessage = (e) => {
  //   e.stopPropagation();
  // }

  render() {
    // const {
    //   props,
    // } = this;

    return (
      <div style={ styles.base } onClick={ (e) => e.stopPropagation() }>
        Recurring Message Options
        <br />
        <br />
        { 'Every ' }
        <input type="text" ref="intervalDays" style={ styles.repeats } />
        { ' days.' }
        <br />
        <br />
        { 'Hour ' }
        <select>
          { Array(24).fill().map((n, k) => k).map((hr) => (<option key={ hr } value={ hr }>{ hr }</option>)) }
        </select>
        <br />
        <br />
        { 'Repeats Left ' }
        <input type="text" ref="repeatsLeft" style={ styles.repeats } />
        <br />
      </div>
    );
  }
}


const styles = {
  base: {
    float: 'right',
    marginTop: 5,
    borderRadius: 5,
    border: '1px solid #71A9B4',
    padding: 5,
  },
  repeats: {
    width: 40,
    height: 20,
  },
  textArea: {
    marginTop: 10,
  },
  historyLink: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
    float: 'right',
  },
  button: {
    backgroundColor: '#A276B7',
  },
};

export default RecurringMessageForm;
