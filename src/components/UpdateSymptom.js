import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import '../App.css';

class UpdateSymptom extends Component {
  render () {
    return (
      <div className=''>
        <p className="symptom-title">Edit Symptom</p>
        <form className="modal-form">
          <TextField id="standard-basic" label="Name" 
            onChange={this.props.handleSymptomNameChange}
            defaultValue={this.props.currentSymptomName}
          />
        <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows="4"
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.props.handleSymptomDescriptionChange}
            defaultValue={this.props.currentSymptomDescription}
        />
          <Button key='i' variant="contained" color="primary" onClick={this.props.handleUpdateSymptom}>
                SAVE
          </Button>
        </form>
      </div>
    );
  }
}

export default UpdateSymptom;