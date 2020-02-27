import React,  {useState} from 'react';
import {List, ListItem, ListSubheader, ListItemText, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, WithStyles, withStyles } from '@material-ui/styles';
import GREY from '@material-ui/core/colors/grey';

const styles = () => createStyles({
        root: {
            backgroundColor: GREY[300]
        },
        subheader: {
            backgroundColor: GREY[700],
            color: GREY[200]
        },
        verdict: {
            fontSize: "30px"
        }
    })

interface Props extends WithStyles<typeof styles> {
    resultsList: Array<Array<String>>
}

interface State {
    verdict: String
}

class ResultsList extends React.Component<Props, State>{
    state = {
        verdict: ""
    }

    render() {
        const {classes} = this.props
        return (
            <List
            className={classes.root}
            subheader={
                <ListSubheader className={classes.subheader} component='div'>
                    {<Typography className={classes.verdict}>{this.getVerdict().toUpperCase()}</Typography>}
                </ListSubheader>
            }>
            {this.getDivider()}
            {
                this.renderItems()
            }
            </List>
        )
    }
    renderItems = () => {
        const resultsList = this.props.resultsList
        var i;
        var listItems = [];
        if (resultsList[0][0] == "") {return undefined}
        for (i=0; i < resultsList.length; i++) {
        listItems.push(
        <ListItem>
            <ListItemText>
                {resultsList[i][0] + " => " + resultsList[i][1]}
            </ListItemText>
        </ListItem>
        )
        }
        return listItems
    }
    getVerdict = () => {
        const resultsList = this.props.resultsList
        if (resultsList[0][0] === "") {return ""}

        var numSupports: number = 0;
        resultsList.forEach( result => {
            if (result[1] === "SUPPORTS") {
                numSupports += 1
            }
        })
        if (numSupports > (resultsList.length)/2) {
            return "True!";
        } else {
            return "False!";
        }
    }
    getDivider = () => {
        if (this.getVerdict() != "") {
            console.log("DIVIDER!")
            return <Divider/>
        }
    }
}

const styledResultsList = withStyles(styles)(ResultsList)
export default styledResultsList