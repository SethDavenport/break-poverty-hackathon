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

  componentDidMount() {
    const { props } = this;

    if (props.people.size === 0) {
      props.getPeople();
    }
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
        <ul>
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
