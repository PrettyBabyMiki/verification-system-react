import React from 'react';
import { AppState } from '../redux/store';
import {TableContainer, TableBody,
        TableCell, TableHead,
        TableRow, Table } from '@material-ui/core'
import {Typography} from '@material-ui/core'
import {createStyles, withStyles, WithStyles} from '@material-ui/styles'
import { connect } from 'react-redux';
import {compose} from 'redux';


interface Row {
    sentence: string;
    verdict: string;
}

interface State {
    finalVerdict: string;
    rows: Row[]
}
interface OwnProps {}

interface StateProps {
    resultsList: string[][];
}

type PublicProps = OwnProps
type Props = StateProps & WithStyles<typeof styles>
class ResultsTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            finalVerdict: "",
            rows: [{sentence:"", verdict:""}]
        }
    }

    // Overrides render method
    render(){
        const {classes} = this.props
        return(
            <React.Fragment>
            <TableContainer>
                <Table size='small' aria-label="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.verdict}><Typography className={classes.root} gutterBottom>Verdict</Typography></TableCell>
                            <TableCell align='left'><Typography gutterBottom className={classes.root}>Relevent Sentence</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                </Table>
            </TableContainer>
            {this.renderVerdictFooter()}
            </React.Fragment>
        )
    }

    renderRows(){
        return this.props.resultsList.map(listItem => {
            const row = this.createData(listItem[0], listItem[1])
            return (
                <TableRow key={row.sentence}>
                    <TableCell component='th' scope='row'>{row.verdict}</TableCell>
                    <TableCell>{row.sentence}</TableCell>
                </TableRow>
                )
        })
    }

    renderVerdictFooter() {
        if (this.props.resultsList.length <= 1) {return;}
        const {classes} = this.props
        return (
            <Typography className={classes.finalVerdict}>Final Verdict: {this.getVerdict()}</Typography>
        )
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

    createData(sentence: string, verdict: string) {
        return {sentence, verdict}
    }
}


function mapStateToProps(appState: AppState): StateProps{
    return {
        resultsList: appState.resultsList
    }
}


const styles = createStyles({
    root: {
        margin: 10,
        'font-weight': 650
    },
    verdict:{
        width: '25px'
    },
    finalVerdict: {
        margin: '15px 0 0 15px'
    }
})

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(ResultsTable) as React.ComponentType<PublicProps>

