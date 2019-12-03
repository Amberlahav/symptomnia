import React, { Component } from 'react';
import { Entry } from './';
import Button from '@material-ui/core/Button';
import '../App.css';

class Entries extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <div className='wrapper'>
        <div className="header-container">
          <h1>Your Entries For {this.props.selectedSymptom.name}</h1>
          <Button onClick={this.props.onClickGoBackToSymptoms} variant="contained" color="primary">
                  BACK
          </Button>
        </div>
          {
            this.props.selectedSymptom.entries.length > 0 ?
            [this.props.selectedSymptom.entries.map((entry) => (
              <Entry
                entry={entry}
                key={entry._id}
              />
            )),
              <Button key='i' variant="contained" color="primary">
                NEW ENTRY
              </Button>]
            : 
              [<p>You have no entries recorded.</p>,
                <Button variant="contained" color="primary">
                NEW ENTRY
              </Button>
            ]
          }
      </div>
    );
  }
}

export default Entries;