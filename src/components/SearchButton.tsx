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
    toggleLoadingCallback: (loading: boolean) => void;
    toggleErrorDisplayCallback: (showError: boolean, message?:string) => void;
}
interface DispatchProps {
    updateResultsList: (resultsList: string[][]) => void;
    enterButtonReset: () => void;
}
interface StateProps {
    claimInput: string
}

type PublicProps = OwnProps     // Exposed for parent component's props injection
type Props = PublicProps & StateProps & DispatchProps & WithStyles<typeof styles>

class SearchButton extends React.Component<Props> {
    render() {
        const {classes} = this.props
        return (
            <Button
                variant="contained"
                endIcon={<Icon>beenhere</Icon>}
                size="large"
                className={classes.root}
                onClick={this.search}
            >
            Verify
            </Button>
        )
    }

    // search function
    search = () => {
        this.props.toggleErrorDisplayCallback(false)
        const url = "https://api-gateway-dot-fact-verification-system.appspot.com/evidence"
        const data = {data: {claim: this.props.claimInput}}
        this.props.toggleLoadingCallback(true);
        axios.post(url, data)
            .then(res => {
                this.props.toggleLoadingCallback(false);
                this.props.updateResultsList(res.data.data)
                // cancel loading screen.
            }).catch(error => {
                let message = "unknown error."
                if (error.response.data) {
                    message = error.response.data.message
                }
                this.props.toggleErrorDisplayCallback(true, message)
            }).finally(() => {
                this.props.toggleLoadingCallback(false);
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

function mapStateToProps(appState:AppState, ownProps: Props) {
    return {
        claimInput: appState.claimInput
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        updateResultsList: (rl: string[][]) => dispatch(updateResultsList(rl)),
    }
}


const styleButton = withStyles(styles);
const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default compose(
    styleButton,
    connectToStore
)(SearchButton) as React.ComponentType<PublicProps>;