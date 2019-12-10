import React from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';

export default function Navbar(props) {
    return (
        <nav className="nav">
            <img src="" alt="symptomnia" />
            <div className="nav-btn-container">
                <Button color="inherit" onClick={() => { props.history.push('/'); }}>Logout</Button>
                <Button color="inherit">Signup</Button>
            </div>
        </nav>
    );
  
}