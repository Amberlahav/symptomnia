import React from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';

export default function Navbar(props) {
    return (
        <nav className="nav">
            <span className="logo-text">symptomnia</span>
            <div className="nav-btn-container">
                <Button style={{ color:'#011ff5' }} onClick={() => { props.history.push('/'); }}>Logout</Button>
            </div>
        </nav>
    );
  
}