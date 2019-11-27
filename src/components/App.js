import React, { Component } from 'react';
import { Dashboard } from './';
import '../App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      symptoms: [],
      newSymptom: ''
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
        <Dashboard />
      </div>
    );
  }
}

export default App;
