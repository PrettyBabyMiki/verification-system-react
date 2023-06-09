import React, { Component, Dispatch } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { UpdateInput,  UpdateResults} from '../redux/actions';
import { UPDATE_INPUT,  UPDATE_RESULTS} from '../redux/types';
import { AppState } from '../redux/store'


interface State {
    errorState: boolean;
    defaultValue: string;
    helperText: string;
}

interface OwnProps {
    enterCallback: (e: React.KeyboardEvent) => void;
    toggleLoadingCallback: (loading: boolean) => void;
    toggleErrorDisplayCallback: (showError: boolean, message?:string) => void;
}
interface StateProps {
    claimInput: string;
}

interface DispatchProps {
    updateClaimInput: (inputClaim: string) => void;
    updateResultsList: (rl: string[][]) => void;
}

type PublicProps = OwnProps
type Props = PublicProps & DispatchProps & StateProps
class ClaimInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            errorState:false,
            defaultValue: "",
            helperText: "e.g. Melbourne is a city in Australia."
        }
    }

    componentDidMount(){
        this.props.updateClaimInput(this.state.defaultValue)
    }

    render() {
        return (
            <TextField id='claim-input'
            variant='outlined'
            type='search'
            size='medium'
            fullWidth
            autoFocus
            placeholder="Enter a fact."
            error={this.state.errorState}
            defaultValue={this.state.defaultValue}
            helperText={<Typography variant='subtitle1'>{this.state.helperText}</Typography>}
            onChange={this.handleTextChange}
            onKeyPress={this.handleEnter}
            />
        )
    }

    handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, errorState:false})
        this.props.updateClaimInput(e.currentTarget.value);
    }

    handleEnter = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") { return ; }
        if (this.props.claimInput.length <= 0) {
            this.props.toggleErrorDisplayCallback(true, "Please enter something.")
            this.setState({...this.state, errorState:true})
            return
        }
        this.search();
    }
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
                this.props.toggleErrorDisplayCallback(true, error.message)
            }).finally(() => {
                this.props.toggleLoadingCallback(false);
            })
        // start loading screen.
    }
}

// Redux
// Action Creators
function updateClaimInput(inputClaim: string): UpdateInput {
    return {
        type: UPDATE_INPUT,
        input: inputClaim
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
        updateClaimInput: (inputClaim: string) => dispatch(updateClaimInput(inputClaim)),
        updateResultsList: (rl: string[][]) => dispatch(updateResultsList(rl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimInput) as React.ComponentType<PublicProps>