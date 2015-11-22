import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/people';
import Radium from 'radium';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addPerson: (person) =>
      dispatch(peopleActions.addPerson(person)),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class PersonEntryForm extends Component {

  static contextTypes = {
    history: PropTypes.object,
  }

  _savePerson = () => {
    const {
      props,
      refs,
    } = this;

    const to = '/people';

    props.addPerson({
      name: refs.newName.value,
      sms: refs.newSMS.value,
    });
    this.context.history.pushState(null, to);
  }

  render() {
    const {
      _savePerson,
    } = this;

    return (
      <div className="m2 border sm-col-12"
           style={ Object.assign({},
                   styles.base,
                   styles.roundBorders,
                 )}>
        <span style={ styles.formText }>
          New Patient Info
        </span>
        <input ref="newName"
               style={ Object.assign({},
                 styles.inputField,
                 styles.roundBorders,
               )}
               type="text"
               placeholder="Name" />
        <br />
        <input ref="newSMS"
               style={ Object.assign({},
                 styles.inputField,
                 styles.roundBorders,
               )}
               type="text"
               placeholder="Phone Number" />
        <br />
        <button style={ Object.assign({},
                  styles.roundBorders,
                  styles.saveButton,
                )}
                onClick={ _savePerson }>
          Save
        </button>
      </div>
    );
  }
}

const styles = {
  roundBorders: {
    borderRadius: 10,
  },
  base: {
    width: 350,
    padding: 10,
    backgroundColor: '#7967B7',
  },
  formText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  inputField: {
    margin: '10px 0px',
    width: 310,
  },
  visible: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
  saveButton: {
    width: 59,
    height: 31,
    margin: '5px 0px',
    color: '#FFFFFF',
    backgroundColor: '#079470',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default PersonEntryForm;
