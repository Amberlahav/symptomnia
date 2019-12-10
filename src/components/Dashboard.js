import React, { Component } from 'react';
import { Navbar , Symptoms , NewSymptom } from './';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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


  render () {
    const { classes } = this.props;
      return (
        <div className='App'>
          <Navbar history={this.props.history} />
          <Symptoms symptoms={this.state.symptoms} history={this.props.history} />
          <Button variant="outlined" color="primary" onClick={this.handleToggleModal}>
              ADD NEW SYMPTOM
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
                      <NewSymptom 
                        newSymptomName={this.state.newSymptomName} 
                        handleSymptomNameChange={this.handleSymptomNameChange}
                        newSymptomDesciption={this.state.newSymptomDescription} 
                        handleSymptomDescriptionChange={this.handleSymptomDescriptionChange}
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
        </div>
      );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Dashboard);
