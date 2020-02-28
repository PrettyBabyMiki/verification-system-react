import React from 'react'
import {connect} from 'react-redux'
import {Dispatch, AnyAction, compose} from 'redux';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {createStyles, withStyles, WithStyles } from '@material-ui/styles'
import axios from 'axios';

import {AppState} from '../redux/store';
import {UPDATE_RESULTS} from '../redux/types';
import {UpdateResults} from '../redux/actions';

const styles = () => createStyles({
    root: {
        margin: '3% 0px 0px 0px'
    }
})

interface OwnProps {
    claimInput: string;
}
interface DispatchProps {
    updateResultsList: (resultsList: string[][]) => void;
}

type PublicProps = OwnProps     // Exposed for parent component's props injection
type Props = PublicProps & DispatchProps & WithStyles<typeof styles>

class SearchButton extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {classes} = this.props
        return (
            <Button
                variant="contained"
                endIcon={<Icon>send</Icon>}
                size="large"
                className={classes.root}
                onClick={this.search}
            >
            Search
            </Button>
        )
    }

    // search function
    search = () => {
        console.log("Send button pressed.")
        const url = "https://api-gateway-dot-fact-verification-system.appspot.com/evidence"
        // const mock = "robert downey junior is iron man."
        const data = {data: {claim: this.props.claimInput}}
        console.log('data to send.', data);
        axios.post(url, data)
            .then(res => {
                console.log("Returned res.data", res.data);
                this.props.updateResultsList(res.data.data)
                // cancel loading screen.
            }).catch(error => {
                console.log("error", error)
                console.log(error.message)
            })

        // start loading screen.
    }
}

// action creators
function updateResultsList(rl: string[][]):UpdateResults {
    return {
        type: UPDATE_RESULTS,
        resultsList: rl
    }
}

function mapStateToProps(storeState:AppState, ownProps: Props) {
    console.log('storeState searchbutton', storeState);
    
    const filtered = storeState
    return filtered
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        updateResultsList: (rl: string[][]) => dispatch(updateResultsList(rl))
    }
}


const styleButton = withStyles(styles);
const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default compose(
    styleButton,
    connectToStore
)(SearchButton) as React.ComponentType<PublicProps>;