import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../App.css';

const useStyles = makeStyles(theme => ({
    root: {
      justifyContent: 'space-between',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
// const classes = useStyles();
class Navbar extends Component {
    
  render () {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start"  color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" >
                News
                </Typography>
                <Button color="inherit">Login</Button> */}
                <nav>
                    <img src="" alt="symptomnia" />
                    <div className="nav-btn-container">
                        <button className="nav-btn nav-login-btn">Login</button>
                        <button className="nav-btn nav-signup-btn">Sign Up</button>
                    </div>
                </nav>
            </Toolbar>
        </AppBar>
    );
  }
}
// export default makeStyles(useStyles)(Navbar);
export default Navbar;