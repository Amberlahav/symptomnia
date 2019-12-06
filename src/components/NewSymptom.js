import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import '../App.css';

class NewSymptom extends Component {
  render () {
    return (
      <div className=''>
        <p className="symptom-title">Add New Symptom</p>
        <form className="modal-form">
          <TextField id="standard-basic" label="Name" 
            onChange={this.props.handleSymptomNameChange}
            value={this.props.newSymptomName}
          />
          <TextareaAutosize 
            aria-label="Description (optional)" 
            rows={3} 
            placeholder="Description (optional)"
            onChange={this.props.handleSymptomDescriptionChange}
            value={this.props.newSymptomDescription} 
          />
          <Button key='i' variant="contained" color="primary" onClick={this.props.handleButtonSubmit}>
                ADD
          </Button>
        </form>
      </div>
    );
  }
}

export default NewSymptom;