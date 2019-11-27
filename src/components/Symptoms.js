import React, { Component } from 'react';
import { Symptom } from './';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// const classes = useStyles();

const symptoms = [
  {
    "name": "Stomachache",
    "id": "123",
    "description": "Used to happen a lot when I was younger, then it stopped for a few years, now it has started up again. Trying to figure out what my new triggers are.",
    "entries": [
        {
            "severity": "mild"
        }
    ]
  },
  {
    "name": "Headache",
    "id": "456",
    "description": "Been having migraines for a while.",
    "entries": [
        {
            "severity": "moderate"
        }
    ]
  }
]

class Symptoms extends Component {
  constructor() {
    super()

    this.state = {
      symptoms: symptoms
    }
  }

  
  render () {
    return (
      <div>
        {
          this.state.symptoms ?
          [this.state.symptoms.map((symptom) => (
            <Symptom
              value={symptom.name}
              key={symptom.id}
            />
          )),
          <Button variant="contained" color="primary">
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
    );
  }
}

export default Symptoms;