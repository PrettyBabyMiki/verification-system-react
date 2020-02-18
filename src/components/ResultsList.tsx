import React from 'react';
import {List, ListItem, ListSubheader} from '@material-ui/core';
import {ListItemIcon, ListItemText} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import GREY from '@material-ui/core/colors/grey';

const useStyles = makeStyles(({
        root: {
            backgroundColor: GREY[300]
        },
        subheader: {
            backgroundColor: GREY[700],
            color: GREY[200]
        }
    }))

export default function ResultList() {
    const classes = useStyles();
    return (
        <List
            className={classes.root}
            subheader={
                <ListSubheader className={classes.subheader} component='div'>Results:</ListSubheader>
        }>
            <Divider/>
            <ListItem>
                <ListItemText>1st result</ListItemText>
            </ListItem>
            
        </List>
    )
}