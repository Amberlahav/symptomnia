import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Landingpage, Dashboard , Login, Signup } from './';
import '../App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      symptoms: ''
    }
  }

  async componentDidMount() {
    const result = await fetch('/api/symptoms')
    const data = await result.json()
    console.log(data.results)
    const prevState = this.state;
    this.setState({
      ...prevState,
      symptoms: data.results
    })
  }

  login = (e) => {
    e.preventDefault();
    console.log('logged in')
  }

  render () {
    return (
      <div className='App'>
        <Router>
          <div>
            <Route exact path="/" component={Landingpage} /> 
            <Route exact path="/dashboard"  
              render={(renderProps) => {
                  return this.state.symptoms &&
                    <Dashboard
                      {...renderProps}
                      symptoms={this.state.symptoms}
                    />
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
