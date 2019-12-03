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
        <form>
          <TextField id="standard-basic" label="Name" 
            onChange={this.props.handleSymptomChange}
            value={this.props.newSymptom}
          />
          <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Minimum 3 rows" />
          <Button key='i' variant="contained" color="primary" onClick={this.props.handleButtonSubmit}>
                ADD
          </Button>
        </form>
      </div>
    );
  }
}

export default NewSymptom;