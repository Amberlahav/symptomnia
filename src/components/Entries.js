import React, { Component } from 'react';
import { Entry } from './';
import '../App.css';

class Entries extends Component {
  constructor() {
    super()

    this.state = {
        entry: 'first entry'
    }
  }

  render () {
    return (
      <div className=''>
          <Entry value={this.state.entry}/>
      </div>
    );
  }
}

export default Entries;