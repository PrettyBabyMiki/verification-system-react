import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

/// Standalone Component
/// Not connected to redux store.

interface PublicProps {}

interface OwnProps {}

interface State {}

const styles = createStyles({
    heading: {
    },
    details: {
        opacity: 0.7
    },
    icon: {
        height: '16px',
        // width: '15px'
    },
})

type Props = PublicProps & OwnProps & WithStyles<typeof styles>



class Instructions extends React.Component<Props, State> {
    // constructor(props: Props) {
    //     super(props)
    // }

    render() {
        const {classes} = this.props
        return (
        <React.Fragment>
        <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant='subtitle2'>Instructions</Typography>
        </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography variant='body2'>
                Please enter anything you believe to be a fact on to the input bar below and hit verify <Icon fontSize='small' className={classes.icon}>beenhere</Icon>!<br/><br/><br/>
                <Typography variant='caption' className={classes.details}>
                This system is trained on a subset of Wikipedia dataset so some facts you enter may return strange or no results at all. <br/><br/>

                For more details and source code on this project, please visit my Github <Link href="https://github.com/jackhhchan/fact-verification-system">here</Link>.<br/>
                To see the data exploration for the natural language inference component, please click <Link href="">here</Link>.<br/>
                Also, stay tuned for the neural network iteration writeup detailing the problems encountered and steps taken! <br/>
                </Typography>
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </React.Fragment>
        )
    }
}



export default withStyles(styles)(Instructions) as React.ComponentType<PublicProps>