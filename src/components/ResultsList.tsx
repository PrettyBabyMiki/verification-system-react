import React from 'react';
import {List, ListItem, ListSubheader, ListItemText, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import GREY from '@material-ui/core/colors/grey';
import { AppState } from '../redux/store';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

interface OwnProps {
}

interface StateProps {
    resultsList: string[][]
}

interface State {
    verdict: string
}

type PublicProps = OwnProps
type Props = PublicProps &  StateProps & WithStyles<typeof styles>

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
            <Divider/>
            {
                this.renderItems()
            }
            </List>
        )
    }
    renderItems = () => {
        const resultsList = this.props.resultsList
        let i;
        const listItems = [];
        if (resultsList[0][0] === "") {return undefined}
        for (i=0; i < resultsList.length; i++) {
        listItems.push(
        <ListItem key={i}>
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

        let numSupports: number = 0;
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
}

// react-redux
function mapStateToProps(storeState: AppState): StateProps{
    return {
        resultsList: storeState.resultsList
    }
}


const styleResultsList = withStyles(styles)
const connectToStore = connect(mapStateToProps)

export default compose(
    styleResultsList,
    connectToStore
)(ResultsList) as React.ComponentType<PublicProps>