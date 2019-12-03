import React from 'react';
import { Entries } from './';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

var dateFormat = require('dateformat');

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



export default function Symptom({ symptom , onClickSelectSymptom}) {
  const classes = useStyles();

  const lastRecorded = symptom.entries.sort().reverse()[0]

  return(
    <div onClick={(e) => onClickSelectSymptom(e, symptom)} className="symptom-container">
          <div className="symptoms-list-container-element">
            <p className="symptom-title">
                {symptom.name}
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
              <span className="bold-md-text">{symptom.entries.length}</span>
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
