import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/people';
import Radium from 'radium';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addPerson: (person) => dispatch(peopleActions.addPerson(person)),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class PersonEntryForm extends Component {
  _savePerson = () => {
    const {
      props,
      refs,
    } = this;

    props.addPerson({
      name: refs.newName.value,
      sms: refs.newSMS.value,
    });
  }

  render() {
    const {
      _savePerson,
    } = this;

    return (
      <div className="m2 border sm-col-12" style={ styles.base }>
        <input ref="newName" type="text" placeholder="Name" />
        <input ref="newSMS" type="text" placeholder="Phone Number" />
        <br />
        <button onClick={ _savePerson }>Save</button>
      </div>
    );
  }
}

const styles = {
  base: {
    width: 350,
  },
  visible: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
};

export default PersonEntryForm;
