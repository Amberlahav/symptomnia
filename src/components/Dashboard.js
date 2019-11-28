import React, { Component } from 'react';
import { Navbar , Symptoms } from './';
import '../App.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render () {
    return (
      <div className='App'>
        <Navbar />
        <Symptoms symptoms={this.props.symptoms}/>
      </div>
    );
  }
}

export default Dashboard;
