import React, { Component } from 'react';
import { Navbar , Symptoms , NewSymptom , UpdateSymptom } from './';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withStyles } from '@material-ui/core/styles';
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

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symptoms: '',
      showEntries: false,
      showSymptoms: true,
      selectedSymptom: '',
      modalOpen: false,
      deleteModalOpen: false,
      updateModalOpen: false,
      newSymptomName:'',
      newSymptomDescription: '',
      error: ''
    }
  }

  async componentDidMount() {
    const result = await fetch('/api/symptoms')
    const data = await result.json()

    const prevState = this.state;
    this.setState({
      ...prevState,
      symptoms: data.results
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
      
      let alreadyExists = false;
      for (let i = 0; i < this.state.symptoms.length; i++) {
        if (this.state.symptoms[i].name.toLowerCase() === this.state.newSymptomName.toLowerCase()) {
          alreadyExists = true
        }
      }

      if(!this.state.newSymptomName || this.state.newSymptomName === '') {
        this.setState({
          error: 'Please enter a symptom name.'
        })
      } else if (alreadyExists) {
        this.setState({
          error: 'This symptom already exists.'
        })
      } else {

        const data = {
          name: this.state.newSymptomName,
          description: this.state.newSymptomDescription
        }
  
        const response = await fetch('/api/symptoms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        const newSymptom = await response.json()
        
        const prevSymptoms = this.state.symptoms
        const nextSymptoms = [...prevSymptoms, newSymptom]
  
        this.setState({
          symptoms: nextSymptoms,
          newSymptomName: '',
          newSymptomDescription: '',
          error: '',
          modalOpen: false
        })
      }
      
    } catch (e) {
      console.log(e)
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newSymptomName: '',
      newSymptomDescription: '',
      error: ''
    })
  };

  handleToggleDeleteModal = (symptom) => {
    this.setState({
      deleteModalOpen: !this.state.deleteModalOpen,
      selectedSymptom: symptom
    })
  };

  handleToggleUpdateModal = (symptom) => {
    this.setState({
      updateModalOpen: !this.state.updateModalOpen,
      selectedSymptom: symptom,
      newSymptomName: symptom.name,
      newSymptomDescription: symptom.description
    })
  };

  handleDeleteSymptom = async (event) => {
    try {
      await fetch(`/api/symptoms/${this.state.selectedSymptom._id}`, {
        method: 'DELETE'
      })

      const prevSymptoms = this.state.symptoms
      const nextSymptoms = prevSymptoms.filter(symptom => symptom !== this.state.selectedSymptom);

      this.setState({
        deleteModalOpen: false,
        symptoms: nextSymptoms
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  handleUpdateSymptom = async (event) => {
    try {
      
      // let alreadyExists = false;
      // for (let i = 0; i < this.state.symptoms.length; i++) {
      //   if (this.state.symptoms[i].name.toLowerCase() === this.state.newSymptomName.toLowerCase()) {
      //     alreadyExists = true
      //   }
      // }

      // if(!this.state.newSymptomName || this.state.newSymptomName === '') {
      //   this.setState({
      //     error: 'Please enter a symptom name.'
      //   })
      // } else if (alreadyExists) {
      //   this.setState({
      //     error: 'You have no edits to make, or have already recorded this symptom.'
      //   })
      // } else {

        const data = {
          name: this.state.newSymptomName,
          description: this.state.newSymptomDescription
        }
        
        const response = await fetch(`/api/symptoms/${this.state.selectedSymptom._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        const newSymptom = await response.json()
  
        const prevSymptoms = this.state.symptoms
        const nextSymptoms = prevSymptoms.map((symptom) => {
          if (symptom._id === newSymptom._id) {
            symptom = newSymptom
          }
          return symptom
        })
  
        this.setState({
          symptoms: nextSymptoms,
          newSymptomName: '',
          newSymptomDescription: '',
          error: '',
          updateModalOpen: false
        })
      
      
    } catch (e) {
      console.log(e)
    }
  }

  handleCancel = () => {
    this.setState({
      modalOpen: false,
      deleteModalOpen: false,
      deleteSymptomModalOpen: false,
      updateModalOpen: false,
    })
  }

  render () {
    const { classes } = this.props;
      return (
        <div className='App'>
          <Navbar history={this.props.history} />
          <Symptoms 
            symptoms={this.state.symptoms} 
            history={this.props.history} 
            handleToggleDeleteModal={this.handleToggleDeleteModal} 
            handleToggleUpdateModal={this.handleToggleUpdateModal}
          />
          <div className="wrapper" style={{display:'flex', alignItems:'flex-start', marginTop:'15px'}}>
            <Button style={{ background: '#011ff5', color: 'white' }} onClick={this.handleToggleModal}>
                <AddCircleOutlineIcon style={{color: 'white', paddingRight: '8px'}}/>ADD NEW SYMPTOM
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
                    <div className={classes.paper}>
                      <NewSymptom 
                        newSymptomName={this.state.newSymptomName} 
                        handleSymptomNameChange={this.handleSymptomNameChange}
                        newSymptomDesciption={this.state.newSymptomDescription} 
                        handleSymptomDescriptionChange={this.handleSymptomDescriptionChange}
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
                            <div className={classes.paper} style={{height:'150px',marginTop:'15px'}}>
                              <p>Are you sure you want to delete this symptom? You will lose all entry data.</p>
                              <Button style={{marginRight:'15px'}}key='i' variant="contained" color="primary" onClick={this.handleDeleteSymptom} >
                                  DELETE
                              </Button>     
                              <Button key='i' variant="contained" color="primary" onClick={this.handleCancel} >
                                  CANCEL
                              </Button>
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
                                  currentSymptomName={this.state.selectedSymptom.name}
                                  handleSymptomNameChange={this.handleSymptomNameChange}
                                  currentSymptomDescription={this.state.selectedSymptom.description} 
                                  handleSymptomDescriptionChange={this.handleSymptomDescriptionChange}
                                  handleUpdateSymptom={this.handleUpdateSymptom}
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
                     
               
        </div>
      );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Dashboard);
