import React, { Component, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { UpdateInput,  UpdateResults} from '../redux/actions';
import { UPDATE_INPUT,  UPDATE_RESULTS} from '../redux/types';
import { AppState } from '../redux/store'


interface State {
    claimInput: string
}

interface OwnProps {
    enterCallback: (e: React.KeyboardEvent) => void;
    toggleLoadingCallback: (loading: boolean) => void;
}
interface StateProps {
    claimInput: string;
}

interface DispatchProps {
    updateClaimInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateResultsList: (rl: string[][]) => void;
}

type PublicProps = OwnProps
type Props = PublicProps & DispatchProps & StateProps
class ClaimInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <TextField id='claim-input'
            variant='outlined'
            type='search'
            size='medium'
            fullWidth
            autoFocus
            placeholder="Enter a claim."
            helperText="e.g. Try 'Robert Downey Junior is Iron man' then 'Robert Downey Junior is NOT Iron man'."
            onChange={this.props.updateClaimInput}
            onKeyPress={this.handleEnter}
            />
        )
    }

    handleEnter = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") { return ; }
        // console.log('search', this.search);
        console.log('props', this.props);
        this.search();
    }
    search = () => {
        console.log("Send button pressed with enter key.")
        const url = "https://api-gateway-dot-fact-verification-system.appspot.com/evidence"
        const data = {data: {claim: this.props.claimInput}}
        console.log('data to send.', data);
        this.props.toggleLoadingCallback(true);
        axios.post(url, data)
            .then(res => {
                this.props.toggleLoadingCallback(false);
                console.log("Returned res.data", res.data);
                this.props.updateResultsList(res.data.data)
                // cancel loading screen.
            }).catch(error => {
                console.log("error", error)
                console.log(error.message)
            }).finally(() => {
                this.props.toggleLoadingCallback(false);
            })
        // start loading screen.
    }
}

// Redux
// Action Creators
function updateClaimInput(e: React.ChangeEvent<HTMLInputElement>): UpdateInput {
    return {
        type: UPDATE_INPUT,
        input: e.currentTarget.value
    }
}

function updateResultsList(rl: string[][]):UpdateResults {
    return {
        type: UPDATE_RESULTS,
        resultsList: rl
    }
}

function mapStateToProps(appState: AppState): StateProps {
    return {
        claimInput: appState.claimInput
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>):DispatchProps{
    return {
        updateClaimInput: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateClaimInput(e)),
        updateResultsList: (rl: string[][]) => dispatch(updateResultsList(rl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimInput) as React.ComponentType<PublicProps>