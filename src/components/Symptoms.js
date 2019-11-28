import React, { Component } from 'react';
import { Symptom } from './';
import Button from '@material-ui/core/Button';
import '../App.css';


class Symptoms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symptoms: this.props.symptoms
    }
  }

  render () {
    return (
      <div className="wrapper">
        <h1>Your Symptoms</h1>
        <div className="symptoms-container">
          <div className="symptoms-list-header">
            <div className="symptoms-list-header-element">
              <h4>Symptom</h4>
            </div>
            <div className="symptoms-list-header-element">
              <h4># of Entries</h4>
            </div>
            <div className="symptoms-list-header-element">
              <h4>Average Severity</h4>
            </div>
          </div>
          {
            this.state.symptoms ?
            [this.state.symptoms.map((symptom) => (
              <Symptom
                symptom={symptom}
                key={symptom._id}
              />
            )),
              <Button key='k' variant="contained" color="primary">
                NEW SYMPTOM
              </Button>]
            : 
              [<p>You have no symptoms recorded.</p>,
                <Button variant="contained" color="primary">
                NEW SYMPTOM
              </Button>
            ]
          }
        </div>
      </div>
    );
  }
}

export default Symptoms;