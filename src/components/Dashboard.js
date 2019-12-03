import React, { Component } from 'react';
import { Navbar , Symptoms , Entries } from './';
import '../App.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symptoms: '',
      showEntries: false,
      showSymptoms: true,
      selectedSymptom: '',
      newSymptom:''
    }
  }

  componentDidMount(){
    if (this.props.symptoms)
    this.setState({
      symptoms: this.props.symptoms
    })
  }

  onClickSelectSymptom = (e , symptom) =>{
    this.setState({
      selectedSymptom: symptom,
      showEntries: !this.state.showEntries,
      showSymptoms: !this.state.showSymptoms
    })
  }


  onClickGoBackToSymptoms = () =>{
    this.setState({
      selectedSymptom: '',
      showEntries: !this.state.showEntries,
      showSymptoms: !this.state.showSymptoms
    })
  }

  handleSymptomChange = (event) => {
    const input = event.target.value

    const prevState = this.state;
    this.setState({
      ...prevState,
      newSymptom: input
    })
  }

  handleButtonSubmit = async (event) => {

    const data = {
      name: this.state.newSymptom
    }
    const response = await fetch('/api/symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }) 
    const newSymptom = await response.json()

    const prevSymptoms = this.state.symptoms
    const nextSymptoms = [...prevSymptoms, newSymptom]

    this.setState({
      symptom: nextSymptoms,
      newSymptom: ''
    })
  }


  render () {
    return (
      <div className='App'>
        <Navbar />
        {
           this.state.showEntries ?
            <Entries selectedSymptom={this.state.selectedSymptom} onClickGoBackToSymptoms={this.onClickGoBackToSymptoms}/>
           :
            <Symptoms symptoms={this.props.symptoms}  onClickSelectSymptom={this.onClickSelectSymptom} newSymptom={this.state.newSymptom} 
            handleSymptomChange={this.handleSymptomChange}
            handleButtonSubmit={this.handleButtonSubmit}/>
        }
      </div>
    );
  }
}

export default Dashboard;
