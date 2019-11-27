import React, { Component } from 'react';
import { Navbar , Symptoms } from './';
import '../App.css';

const symptoms = [
    {
        "name": "Stomachache",
        "description": "Used to happen a lot when I was younger, then it stopped for a few years, now it has started up again. Trying to figure out what my new triggers are.",
        "entries": [
            {
                "severity": "mild"
            }
        ]
    },
    {
        "name": "Headache",
        "description": "Been having migraines for a while.",
        "entries": [
            {
                "severity": "moderate"
            }
        ]
    }
]

class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
    }
  }

  async componentDidMount() {
    const result = await fetch('/api/symptoms')
    const data = await result.json()

    const prevState = this.state;
    this.setState({
      ...prevState,
      symptoms: data.results
    })
  }
  render () {
    return (
      <div className='App'>
        <Navbar />
        <Symptoms />
      </div>
    );
  }
}

export default Dashboard;
