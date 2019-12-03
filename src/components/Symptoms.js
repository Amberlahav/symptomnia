import React, { Component } from 'react';
import { Symptom , NewSymptom} from './';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  constructor(props) {
    super(props)
    this.state = {
      symptoms: this.props.symptoms,
      modalOpen: false,
      lastRecorded: ''
    }

  }

  handleToggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  };

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
          this.state.symptoms && this.props.onClickSelectSymptom ?
            [
              <div className="symptoms-container">
                  {this.state.symptoms.map((symptom) => (
                  <Symptom
                    symptom={symptom}
                    key={symptom._id}
                    onClickSelectSymptom={this.props.onClickSelectSymptom}
                    getLastRecorded={this.getLastRecorded}
                    lastRecorded={this.state.lastRecorded}
                  />
                ))}
              </div>
            ,
            <Button variant="outlined" color="primary" onClick={this.handleToggleModal}>
            ADD NEW SYMPTOM
            </Button>,
            this.state.modalOpen &&
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.state.modalOpen}
                onClose={this.handleToggleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={this.state.modalOpen} out={false}>
                  <div className={classes.paper}>
                    <NewSymptom 
                      newSymptom={this.props.newSymptom} 
                      handleSymptomChange={this.props.handleSymptomChange}
                      handleButtonSubmit={this.props.handleButtonSubmit}
                    />
                  </div>
                </Fade>
              </Modal>
          ]
          : 
          [<p>You have no symptoms recorded.</p>,
            <Button variant="outlined" color="primary" onClick={this.handleToggleModal}>
            ADD NEW SYMPTOM
            </Button>]
            
        }
      </div>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Symptoms);