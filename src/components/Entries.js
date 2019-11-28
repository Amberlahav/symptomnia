import React, { Component } from 'react';
import { Entry } from './';
import Button from '@material-ui/core/Button';
import '../App.css';

class Entries extends Component {
  constructor(props) {
    super(props)

    this.state = {
        entries: this.props.entries
    }
  }

  componentDidMount() {
  }

  render () {
    return (
      <div className=''>
          {
            this.state.entries ?
            [this.state.entries.map((entry) => (
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