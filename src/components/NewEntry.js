import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../App.css';

class NewEntry extends Component {
  constructor(){
    super()
    this.state={

    }
  }
  render () {
    return (
      <div className=''>
        <p className="symptom-title">Log Entry</p>
        <form className="modal-form">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={this.props.newEntryDate}
            onChange={this.props.handleEntryDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={this.props.newEntryDate}
            onChange={this.props.handleEntryDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
    </MuiPickersUtilsProvider>
    <FormControl component="fieldset" >
        <FormLabel component="legend">Severity</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={this.props.newEntrySeverity} onChange={this.props.handleEntrySeverityChange}>
          <FormControlLabel style={{ color: 'green'}} value="mild" control={<Radio />} label="Mild" />
          <FormControlLabel style={{ color: 'orange'}} value="moderate" control={<Radio />} label="Moderate" />
          <FormControlLabel style={{ color: 'red'}} value="severe" control={<Radio />} label="Severe" />
          <FormControlLabel style={{ color: 'maroon'}} value="very severe" control={<Radio />} label="Very Severe" />
        </RadioGroup>
      </FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Factors"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            onChange={this.props.handleEntryFactorsChange}
            value={this.props.newEntryFactors} 
        />
        <div style={{display:'flex', marginTop:'15px'}}>
          <Button style={{marginRight:'15px'}} key='i' variant="contained" color="primary" onClick={this.props.handleButtonSubmit}>
                ADD
          </Button>
          <Button key='i' variant="contained" color="primary" onClick={this.props.handleCancel} >
              CANCEL
          </Button>
        </div>
        </form>
      </div>
    );
  }
}

export default NewEntry;