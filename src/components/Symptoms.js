import React, { Component } from 'react';
import { Symptom } from './';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../App.css';

const useStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    background: 'none',
    boxShadow:'none'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border:'none'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '20px',
    height: '50vh',
    width: '500px',
    borderRadius: '4px',
    outline:'none'
  },
});

class Symptoms extends Component {
  
  showDetails = (id) => {
    this.props.history.push(`/symptom/${id}`);
  }

  render () {
    const { classes } = this.props;
    return (
      <div className="wrapper">
        <div className="header-container">
          <h1 className="symptoms-heading">Your Symptoms</h1>
        </div>
        {
          this.props.symptoms && 
            <div className="symptoms-container">
                {this.props.symptoms.map((symptom) => (
                  <Symptom
                    symptom={symptom}
                    id={symptom._id}
                    key={symptom._id}
                    showDetails={this.showDetails}
                    handleToggleDeleteModal={this.props.handleToggleDeleteModal}
                    handleToggleUpdateModal={this.props.handleToggleUpdateModal}
                  />
                ))}
            </div>
        }
      </div>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Symptoms);