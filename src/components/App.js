import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Landingpage, Dashboard , Login, Signup } from './';
import '../App.css';

export default function App() {

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  // }
    return (
      <div className='App'>
        <Router>
          <div>
            <Route exact path="/" component={Landingpage} /> 
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
      </div>
    );
}

