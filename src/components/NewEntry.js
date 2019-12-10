import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import '../App.css';

class NewEntry extends Component {
  render () {
    return (
      <div className=''>
        <p className="symptom-title">Log Entry</p>
        <form className="modal-form">
          <input type="date" onChange={this.props.handleEntryDateChange} />
          <TextField id="standard-basic" label="Severity" 
            onChange={this.props.handleEntrySeverityChange}
            value={this.props.newEntrySeverity}
          />
          <TextareaAutosize 
            aria-label="Factors (optional)" 
            rows={3} 
            placeholder="Factors (optional)"
            onChange={this.props.handleEntryFactorsChange}
            value={this.props.newEntryFactors} 
          />
          <Button key='i' variant="contained" color="primary" onClick={this.props.handleButtonSubmit}>
                ADD
          </Button>
        </form>
      </div>
    );
  }
}

export default NewEntry;