import React from 'react';
// import { Entries } from './';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const dateFormat = require('dateformat');

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));


export default function Symptom({ symptom , showDetails , handleToggleDeleteModal , handleToggleUpdateModal }) {
  const classes = useStyles();

  
  
  const calculateAverage = () => {
    // const getSeverityNum = (severity) => {
    //   switch (severity) {
    //       case 'mild':
    //         return 1
    //       case 'moderate':
    //           return 2
    //       case 'severe':
    //           return 3
    //       case 'very severe':
    //           return 4
    //       default:
    //           return 1
    //     }
    // }
    const nums = symptom.entries.map((entry) => {
      switch (entry.severity) {
        case 'mild':
          return 1
        case 'moderate':
            return 2
        case 'severe':
            return 3
        case 'very severe':
            return 4
        default:
            return 1
      }
    })
    const calcAvg = nums.reduce((a,b) => a + b, 0) / nums.length
    const average = (Math.floor(calcAvg));
    switch (average) {
      case 1:
        return <p style={{ color: 'green' }}>Mild</p>
      case 2:
          return <p style={{ color: 'orange' }}>Moderate</p>
      case 3:
          return <p style={{ color: 'red' }}>Severe</p>
      case 4:
          return <p style={{ color: 'maroon' }}>Very Severe</p>
      default:
          return <p>N/A</p>
    }
  }

  let lastRecorded;
  if (symptom.entries) {
    lastRecorded = symptom.entries.sort().reverse()[0]
  }

  return(
    <div className="symptom-container">
          <div onClick={() => {showDetails(symptom._id)}} className="symptoms-list-container-element">
            <p className="symptom-title">
                {symptom.name && symptom.name}
            </p>
              {
                lastRecorded &&
                <span className="date-label small-light-text">
                  Last recorded:
                  {dateFormat(lastRecorded.date, 'mm/dd/yyyy')}
                </span>
              }
          </div>
          <Divider className={classes.divider} orientation="vertical" />
          <div className="symptoms-list-container-element">
              <p className="small-light-text">Entries</p>
              <span className="bold-md-text">{symptom.entries ? symptom.entries.length : 0 }</span>
          </div>
          <Divider className={classes.divider} orientation="vertical" />
          <div className="symptoms-list-container-element">
            <p className="small-light-text">Avg Severity</p>
            <span className="bold-md-text">{calculateAverage()}</span>
          </div>
          <Divider className={classes.divider} orientation="vertical" />
          <div className="symptoms-list-container-element">
              <p className="small-light-text">Actions</p>
              <span onClick={() => {handleToggleDeleteModal(symptom)}}><DeleteIcon /></span>
              <span onClick={() => {handleToggleUpdateModal(symptom)}}><EditIcon /></span>
          </div>
    </div>

  )

}
