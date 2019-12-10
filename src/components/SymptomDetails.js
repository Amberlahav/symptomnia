import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Navbar, NewEntry } from './';

const dateFormat = require('dateformat');

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
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

class SymptomDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symptom: '',
      entries: '',
      selectedEntry: '',
      modalOpen: false,
      deleteModalOpen: false,
      newEntryDate: '',
      newEntryTime: '',
      newEntrySeverity: '',
      newEntryFactors: '',
      error: ''
    }
  } 
  // const classes = styles();

  // const [ symptom, updateSymptom ] = useState({});
  // const hasRetrievedSymptom = useRef(false);

  async componentDidMount() {
    try {
        const response = await fetch(`/api/symptoms/${this.props.match.params.symptomId}`);
        const resp = await response.json()

        this.setState({
          symptom: resp,
          entries: resp.entries
        })

      } catch (ex) {
        console.log(ex)
      }
  }
  
  handleEntryDateChange = (event) => {
    const input = event.target.value

    const prevState = this.state;

    this.setState({
      ...prevState,
      newEntryDate: input,
      error: ''
    })
  }

  handleEntrySeverityChange = (event) => {
    const input = event.target.value

    const prevState = this.state;

    this.setState({
      ...prevState,
      newEntrySeverity: input
    })
  }

  handleEntryFactorsChange = (event) => {
    const input = event.target.value

    const prevState = this.state;
    this.setState({
      ...prevState,
      newEntryFactors: input
    })
  }

  handleButtonSubmit = async (event) => {
    try {

      if(!this.state.newEntrySeverity || this.state.newEntrySeverity === '') {
        this.setState({
          error: 'Please choose a severity.'
        })
      } else {

        const data = {
          date: this.state.newEntryDate,
          severity: this.state.newEntrySeverity,
          factors: this.state.newEntrySeverity,
          symptom: this.state.symptom._id
        }
  
        const response = await fetch('/api/entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        const newEntry = await response.json()
  
        const prevEntries = this.state.symptom.entries
        const nextEntries = [...prevEntries, newEntry]
  
        this.setState({
          entries: nextEntries,
          newEntryDate: '',
          newEntrySeverity: '',
          newEntryFactors: '',
          error: '',
          modalOpen: false
        })
      }
      
    } catch (e) {
      console.log(e)
    }
  }

  handleDeleteEntry = async (event) => {
    try {
      await fetch(`/api/entries/${this.state.selectedEntry._id}`, {
        method: 'DELETE'
      })

      const prevEntries = this.state.symptom.entries
      const nextEntries = prevEntries.filter(entry => entry !== this.state.selectedEntry);

      this.setState({
        deleteModalOpen: false,
        entries: nextEntries
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  renderIcon = (severity) => {
    switch (severity) {
        case 'mild':
          return <SentimentSatisfiedIcon />
        case 'moderate':
            return <SentimentDissatisfiedIcon />
        case 'severe':
            return <SentimentVeryDissatisfiedIcon />
        case 'very severe':
            return <MoodBadIcon />
        default:
            return <MoodBadIcon />
      }
  }

  handleToggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newEntryDate: '',
      newEntryTime: '',
      newEntrySeverity: '',
      newEntryFactors: '',
      error: ''
    })
  };

  handleToggleDeleteModal = (entry) => {
    this.setState({
      deleteModalOpen: !this.state.deleteModalOpen,
      selectedEntry: entry
    })
  };

  render() {
    const { classes } = this.props;
    const { symptom , entries } = this.state;

    return (
        [
          <Navbar history={this.props.history} />,
          <div className="wrapper">
              <p>Symptom details</p>
                  <Button key='i' variant="contained" color="primary" onClick={() => { this.props.history.push('/dashboard'); }}>
                      BACK
                  </Button>
                  <Typography className={classes.textPadding} component="p" variant="body1" align="left" color="textPrimary">
                      {symptom.name}
                  </Typography>
                  <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                          Entries
                          </ListSubheader>
                      }
                      className={classes.root}
                      >
                      {
                          entries && entries.map((entry)=> (
                              <ListItem>
                                  <ListItemAvatar>
                                      <Avatar>
                                          {this.renderIcon(entry.severity)}
                                      </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary={dateFormat(entry.date, 'ddd, mmm dS, yyyy, h:MM TT')} secondary={entry.severity}/>
                                  <span onClick={() => {this.handleToggleDeleteModal(entry)}}><DeleteIcon /></span>
                              </ListItem>
                          ))
                      }
                      </List>
                      <Button variant="outlined" color="primary" onClick={this.handleToggleModal}>
                        NEW ENTRY
                      </Button>
                      {this.state.modalOpen ?
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
                              <NewEntry
                                newEntryDate={this.state.newEntryDate} 
                                handleEntryDateChange={this.handleEntryDateChange}
                                newEntrySeverity={this.state.newEntrySeverity} 
                                handleEntrySeverityChange={this.handleEntrySeverityChange}
                                newEntryFactors={this.state.newEntryFactors} 
                                handleEntryFactorsChange={this.handleEntryFactorsChange}
                                handleButtonSubmit={this.handleButtonSubmit}
                              />
                            {
                              this.state.error &&
                            <p>{this.state.error}</p>
                            }
                          </div>
                        </Fade>
                      </Modal>
                      : null
                    }
                    {this.state.deleteModalOpen ?
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.deleteModalOpen}
                            onClose={this.handleToggleDeleteModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                          <Fade in={this.state.deleteModalOpen} out={false}>
                            <div className={classes.paper}>
                              <p>Are you sure you want to delete this entry?</p>
                              <Button key='i' variant="contained" color="primary" onClick={this.handleDeleteEntry} >
                                  DELETE
                              </Button>     
                          </div>
                        </Fade>
                      </Modal>
                      : null
                    }
               
          </div>
        ]
    );
  }
};

export default withStyles(styles)(SymptomDetails);