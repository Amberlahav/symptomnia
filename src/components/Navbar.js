import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import '../App.css';

// const useStyles = makeStyles(theme => ({
//     root: {
//       justifyContent: 'space-between',
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }));
// const classes = useStyles();
class Navbar extends Component {
    
  render () {
    return (
        <nav>
            <img src="" alt="symptomnia" />
            <div className="nav-btn-container">
                <Button color="inherit">Logout</Button>
                <Button color="inherit">Signup</Button>
            </div>
        </nav>
    );
  }
}
// export default makeStyles(useStyles)(Navbar);
export default Navbar;