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


export default function Symptom({ symptom , showDetails }) {
  const classes = useStyles();

  let lastRecorded;
  if (symptom.entries) {
    lastRecorded = symptom.entries.sort().reverse()[0]
  }

  return(
    <div onClick={() => {showDetails(symptom._id)}} className="symptom-container">
          <div className="symptoms-list-container-element">
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
            <span className="bold-md-text">Mild</span>
          </div>
          <Divider className={classes.divider} orientation="vertical" />
          <div className="symptoms-list-container-element">
              <p className="small-light-text">Actions</p>
              <span><DeleteIcon /></span>
              <span><EditIcon /></span>
          </div>
    </div>

  )

}
