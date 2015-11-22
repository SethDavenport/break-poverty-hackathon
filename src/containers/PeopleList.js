import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/people';
import Radium from 'radium';

function mapStateToProps(state) {
  return {
    people: state.people.get('peopleList'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: () => dispatch(peopleActions.getPeople()),
    deletePerson: (id) => dispatch(peopleActions.deletePerson(id)),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class PeopleList extends Component {
  static propTypes = {
    people: PropTypes.object.isRequired,
    getPeople: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object,
  }

  _fetchPeople = () => {
    const { props } = this;

    if (props.people.size === 0) {
      props.getPeople();
    }
  }

  _addPerson = () => {
    const to = '/person/add';
    this.context.history.pushState(null, to);
  }

  componentDidMount() {
    this._fetchPeople();
  }

  componentDidUpdate() {
    this._fetchPeople();
  }

  render() {
    const { props } = this;

    const rows = (props.people) ? props.people.map((person, index) => {
      return (
        <li style={ styles.person }
            key={ index }>
          { person.get('name') }
          <div style={ styles.deleteButton }
               onClick={ props.deletePerson.bind(null, person.get('_id'))}>
            x
          </div>
        </li>
      );
    }) : 'No people found.';

    return (
      <div className="m2 sm-col-12" style={ styles.base }>
        <span style={ styles.label }>
          Patients
        </span>
        <button style={ styles.addButton }
                onClick={ this._addPerson }>
          Add Patient
        </button>
        <ul style={ styles.peopleList }>
          { rows }
        </ul>
      </div>
    );
  }
}

const styles = {
  base: {
    width: '80%',
  },
  label: {
    color: '#83B2BB',
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    margin: '10px 0px 5px 10px',
    display: 'inline-block',
  },
  addButton: {
    display: 'block',
    float: 'right',
    backgroundColor: '#56A7DA',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    margin: '10px 0 10px 0',
  },
  deleteButton: {
    backgroundColor: '#E25151',
    color: '#FFFFFF',
    padding: '1px 2px',
    border: 'none',
    fontFamily: 'Courier New',
    float: 'right',
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#F1A5A5',
    },
  },
  peopleList: {
    listStyleTyle: 'none',
    padding: 0,
    margin: '10px 0px 0px 10px',
  },
  person: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    backgroundColor: '#83B2BB',
    lineHeight: 1,
    borderBottom: '1px solid #fff',
    padding: 3,
  },
  visible: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
};

export default PeopleList;
