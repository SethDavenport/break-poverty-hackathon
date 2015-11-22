import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/people';
import Radium from 'radium';
import Message from '../components/Message';

function mapStateToProps(state) {
  return {
    people: state.people.get('peopleList'),
    selectedPerson: state.people.get('selectedPerson'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: () => dispatch(peopleActions.getPeople()),
    deletePerson: (id) => dispatch(peopleActions.deletePerson(id)),
    selectPerson: (id) => dispatch(peopleActions.selectPerson(id)),
  };
}

const interval = 500;

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class PeopleList extends Component {

  static propTypes = {
    selectedPerson: PropTypes.string,
    people: PropTypes.object.isRequired,
    getPeople: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    selectPerson: PropTypes.func.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object,
  }

  static defaultProps = {
    selectedPerson: null,
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

  _selectPerson = (id, e) => {
    e.stopPropagation();
    this.props.selectPerson(id);
  }

  _deletePerson = (id, e) => {
    e.stopPropagation();
    this.props.deletePerson(id);
  }

  componentDidMount() {
    this._fetchPeople();
    window.setInterval(() => this._fetchPeople(), interval);
  }

  componentDidUpdate() {
    window.setInterval(() => this._fetchPeople(), interval);
  }

  render() {
    const {
      props,
      _selectPerson,
      _deletePerson,
    } = this;

    const rows = (props.people) ? props.people.map((person, index) => {
      return (
        <li style={ styles.person }
            onClick={ _selectPerson.bind(null, person.get('_id'))}
            key={ index }>
          { person.get('name') }
          <div style={ styles.deleteButton }
               onClick={ _deletePerson.bind(null, person.get('_id'))}>
            x
          </div>
          { (person.get('_id') === props.selectedPerson) ? (
              <Message personId={ person.get('_id')} />
            ) : null
          }
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
    width: 25,
    height: 25,
    textAlign: 'center',
    border: 'none',
    borderRadius: '50%',
    fontFamily: 'Arial',
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
    fontSize: 20,
    backgroundColor: '#83B2BB',
    lineHeight: 1,
    borderBottom: '1px solid #fff',
    padding: 10,
  },
  visible: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
};

export default PeopleList;
