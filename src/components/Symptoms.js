import React, { Component } from 'react';
import { Symptom } from './';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
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

  render () {
    const { classes } = this.props;
    return (
      <div className="wrapper">
        <div className="header-container">
          <h1 className="symptoms-heading">Your Symptoms</h1>
          <Paper component="form" className={classes.root}>
             <TextField id="standard-basic" label="Search Symptoms" />
          </Paper>
        </div>
        {
          this.props.symptoms && 
              <div className="symptoms-container">
                  {this.props.symptoms.map((symptom) => (
                  <Symptom
                    symptom={symptom}
                    key={symptom._id}
                    onClickSelectSymptom={this.props.onClickSelectSymptom}
                  />
                ))}
              </div>
        }
      </div>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Symptoms);