import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { Navbar } from './';

const dateFormat = require('dateformat');

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SymptomDetails(props) {
  const classes = styles();

  const [ symptom, updateSymptom ] = useState({});
  const hasRetrievedSymptom = useRef(false);

  useEffect(()=> {

    async function getPageById() {
      try {
        const response = await fetch(`/api/symptoms/${props.match.params.symptomId}`);
        const resp = await response.json()

        updateSymptom(resp)

        hasRetrievedSymptom.current = true;

      } catch (ex) {
        console.log(ex)
      }
    }

    if (!hasRetrievedSymptom.current) {
      getPageById();
    }

  })

  const renderIcon = (severity) => {
    switch (severity) {
        case 'mild':
          return <SentimentSatisfiedIcon />
        case 'moderate':
            return <SentimentDissatisfiedIcon />
        case 'severe':
            return <SentimentVeryDissatisfiedIcon />
        case 'very severe':
            return <MoodBadIcon />
        default:
            return <MoodBadIcon />
      }
  }

  return (
      [
        <Navbar history={props.history} />,
        <div className="wrapper">
            <p>Symptom details</p>
                <Button key='i' variant="contained" color="primary" onClick={() => { props.history.push('/dashboard'); }}>
                    BACK
                </Button>
                <Typography className={classes.textPadding} component="p" variant="body1" align="left" color="textPrimary">
                    {symptom.name}
                </Typography>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        Entries
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                    {
                        symptom.entries && symptom.entries.map((entry)=> (
                            <ListItem key={entry._id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {renderIcon(entry.severity)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={dateFormat(entry.date, 'ddd, mmm dS, yyyy, h:MM TT')} secondary={entry.severity}/>
                            </ListItem>
                        ))
                    }
                    </List>
                {/* {
                    symptom.entries && symptom.entries.map((entry) => (
                        <li>
                            {entry.severity}
                        </li>
                    ))
                } */}
             
        </div>
      ]
  );
};
