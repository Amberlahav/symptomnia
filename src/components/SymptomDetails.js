import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
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

import { Navbar, NewEntry , UpdateSymptom } from './';

const dateFormat = require('dateformat');

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
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
  newEntry:{
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '20px',
    height: '80vh',
    width: '500px',
    borderRadius: '4px',
    outline:'none'
  }
});

class SymptomDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symptom: '',
      entries: '',
      selectedEntry: '',
      modalOpen: false,
      deleteEntryModalOpen: false,
      deleteSymptomModalOpen: false,
      updateModalOpen: false,
      newSymptomName:'',
      newSymptomDescription: '',
      newEntryDate: '',
      newEntryTime: '',
      newEntrySeverity: '',
      newEntryFactors: '',
      error: ''
    }
  } 

  async componentDidMount() {
    try {
        const response = await fetch(`/api/symptoms/${this.props.match.params.symptomId}`);
        const resp = await response.json()

        this.setState({
          symptom: resp,
          entries: resp.entries,
          newEntryDate: new Date()
        })

      } catch (ex) {
        console.log(ex)
      }
  }
  
  handleEntryDateChange = (date) => {
    const input = date

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

  handleSymptomNameChange = (event) => {
    const input = event.target.value

    const prevState = this.state;

    this.setState({
      ...prevState,
      newSymptomName: input,
      error: ''
    })
  }

  handleSymptomDescriptionChange = (event) => {
    const input = event.target.value

    const prevState = this.state;
    this.setState({
      ...prevState,
      newSymptomDescription: input 
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
          factors: this.state.newEntryFactors,
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
        
        const prevEntries = this.state.entries
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

      const prevEntries = this.state.entries
      const nextEntries = prevEntries.filter(entry => entry !== this.state.selectedEntry);

      this.setState({
        deleteEntryModalOpen: false,
        entries: nextEntries
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  handleDeleteSymptom = async (event) => {
    try {
      await fetch(`/api/symptoms/${this.state.symptom._id}`, {
        method: 'DELETE'
      })

      this.props.history.push('/dashboard')
    } catch (ex) {
      console.log(ex)
    }
  }

  handleUpdateSymptom = async (event) => {
    try {
      
        const data = {
          name: this.state.newSymptomName,
          description: this.state.newSymptomDescription
        }
        
        const response = await fetch(`/api/symptoms/${this.state.symptom._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        const newSymptom = await response.json()
  
        this.setState({
          symptom: {
            name: newSymptom.name,
            description: newSymptom.description
          },
          updateModalOpen: false
        })
      
      
    } catch (e) {
      console.log(e)
    }
  }

  handleCancel = () => {
    this.setState({
      modalOpen: false,
      deleteEntryModalOpen: false,
      deleteSymptomModalOpen: false,
      updateModalOpen: false,
    })
  }

  renderIcon = (severity) => {
    switch (severity) {
        case 'mild':
          return (
            <Avatar style={{ background: 'lightgreen' }}>
                <SentimentSatisfiedIcon style={{ color: 'green', background:'lightgreen' }} />
            </Avatar>
          )
        case 'moderate':
            return (
              <Avatar style={{ background: 'gold' }}>
                  <SentimentDissatisfiedIcon style={{ color: 'orange', background:'gold' }} />
              </Avatar>
            )
        case 'severe':
            return (
              <Avatar style={{ background: 'pink' }}>
                  <SentimentVeryDissatisfiedIcon style={{ color: 'maroon', background:'pink' }} />
              </Avatar>
            )
        case 'very severe':
            return (
              <Avatar style={{ background: 'lightpurple' }}>
                  <MoodBadIcon style={{ color: 'black', background:'lightpurple' }} />
              </Avatar>
            )
        default:
            return (
              <Avatar style={{ background: 'lightgreen' }}>
                  <SentimentSatisfiedIcon style={{ color: 'green', background:'lightgreen' }} />
              </Avatar>
            )
      }
  }

  handleToggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newEntryDate: new Date(),
      newEntryTime: '',
      newEntrySeverity: '',
      newEntryFactors: '',
      error: ''
    })
  };

  handleToggleDeleteEntryModal = (entry) => {
    this.setState({
      deleteEntryModalOpen: !this.state.deleteEntryModalOpen,
      selectedEntry: entry
    })
  };

  handleToggleDeleteSymptomModal = () => {
    this.setState({
      deleteSymptomModalOpen: !this.state.deleteSymptomModalOpen
    })
  };

  handleToggleUpdateModal = () => {
    this.setState({
      updateModalOpen: !this.state.updateModalOpen,
      newSymptomName: this.state.symptom.name,
      newSymptomDescription: this.state.symptom.description
    })
  };

  render() {
    const { classes } = this.props;
    const { symptom , entries } = this.state;

    return (
        [
          <Navbar history={this.props.history} />,
          <div className="wrapper">
               <div className="header-container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h1 className="symptoms-heading" >Symptom Details</h1>
                        <Button style={{ background: '#011ff5', color: 'white', width:'120px' }} onClick={() => { this.props.history.push('/dashboard'); }}>
                            <ArrowBackIcon style={{color: 'white', paddingRight: '4px'}}/>BACK
                        </Button>
                </div>
                <div className={classes.root} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <p className="symptom-title" style={{marginTop:'0px', paddingTop:'20px', paddingLeft:'20px'}}>
                    {symptom.name}
                    </p>
                    <span className="date-label small-light-text" style={{fontSize:'14px', paddingBottom:'20px', paddingLeft:'20px'}}>
                    {symptom.description} 
                    </span>
                  </div>
                  <div style={{paddingRight:'16px'}}>
                    <span style={{marginRight:'5px'}}className="action-btn" onClick={this.handleToggleDeleteSymptomModal}><DeleteIcon /></span> <span className="action-btn" onClick={this.handleToggleUpdateModal}><EditIcon /></span>
                  </div>
                  
                </div>
                  <div className="header-container" style={{ paddingTop:'5px'}}>
                    <h1 className="symptoms-heading">Entries</h1>
                  </div>
                  {
                    entries.length > 0 ?
                  
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        // subheader={
                        //     <ListSubheader component="div" id="nested-list-subheader">
                        //     Entries
                        //     </ListSubheader>
                        // }
                        className={classes.root}
                        >
                        {
                            entries && entries.map((entry)=> (
                                [<ListItem>
                                    <ListItemAvatar>
                                          {this.renderIcon(entry.severity)}
                                    </ListItemAvatar>
                                    <ListItemText primary={dateFormat(entry.date, 'ddd, mmm dS, yyyy, h:MM TT')} secondary={entry.severity}/>
                                    {
                                      entry.factors &&
                                      <ListItemText primary='Factors:' secondary={entry.factors} />
                                    }
                                    <span className="action-btn" onClick={() => {this.handleToggleDeleteEntryModal(entry)}}><DeleteIcon /></span>
                                </ListItem>,
                                <Divider />]
                            ))
                        }
                        </List>
                      : <p style={{textAlign:'left', marginBottom:'40px'}}>You have no entries recorded.</p>}
                      <div className="wrapper" style={{display:'flex', alignItems:'flex-start', margin:'20px 0'}}>
                        <Button style={{ background: '#011ff5', color: 'white' }} onClick={this.handleToggleModal}>
                            <AddCircleOutlineIcon style={{color: 'white', paddingRight: '8px'}}/>LOG NEW ENTRY
                        </Button>
                      </div>
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
                            <div className={classes.newEntry}>
                              <NewEntry
                                newEntryDate={this.state.newEntryDate} 
                                handleEntryDateChange={this.handleEntryDateChange}
                                newEntrySeverity={this.state.newEntrySeverity} 
                                handleEntrySeverityChange={this.handleEntrySeverityChange}
                                newEntryFactors={this.state.newEntryFactors} 
                                handleEntryFactorsChange={this.handleEntryFactorsChange}
                                handleButtonSubmit={this.handleButtonSubmit}
                                handleCancel={this.handleCancel}
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
                    {this.state.deleteEntryModalOpen ?
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.deleteEntryModalOpen}
                            onClose={this.handleToggleDeleteEntryModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                          <Fade in={this.state.deleteEntryModalOpen} out={false}>
                            <div className={classes.paper} style={{height:'150px'}}>
                              <p>Are you sure you want to delete this entry?</p>
                              <div style={{display:'flex', marginTop:'15px'}}>
                                <Button style={{marginRight:'15px'}} key='i' variant="contained" color="primary" onClick={this.handleDeleteEntry} >
                                    DELETE
                                </Button>
                                <Button key='i' variant="contained" color="primary" onClick={this.handleCancel} >
                                    CANCEL
                                </Button>
                              </div>
                                   
                          </div>
                        </Fade>
                      </Modal>
                      : null
                    }
                    {this.state.deleteSymptomModalOpen ?
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.deleteSymptomModalOpen}
                            onClose={this.handleToggleDeleteSymptomModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                          <Fade in={this.state.deleteSymptomModalOpen} out={false}>
                            <div className={classes.paper} style={{height:'150px'}}>
                              <p>Are you sure you want to delete this symptom? You will lose all entry data.</p>
                              <div style={{display:'flex', marginTop:'15px'}}>
                                <Button style={{marginRight:'15px'}} key='i' variant="contained" color="primary" onClick={this.handleDeleteSymptom} >
                                    DELETE
                                </Button>
                                <Button key='i' variant="contained" color="primary" onClick={this.handleCancel} >
                                    CANCEL
                                </Button>  
                              </div>
                          </div>
                        </Fade>
                      </Modal>
                      : null
                    }
                  {this.state.updateModalOpen ?
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.updateModalOpen}
                            onClose={this.handleToggleUpdateModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                          <Fade in={this.state.updateModalOpen} out={false}>
                            <div className={classes.paper}>
                              <UpdateSymptom 
                                  currentSymptomName={this.state.symptom.name}
                                  handleSymptomNameChange={this.handleSymptomNameChange}
                                  currentSymptomDescription={this.state.symptom.description} 
                                  handleSymptomDescriptionChange={this.handleSymptomDescriptionChange}
                                  handleUpdateSymptom={this.handleUpdateSymptom}
                                  handleCancel={this.handleCancel}
                                /> 
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