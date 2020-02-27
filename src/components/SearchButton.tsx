import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { makeStyles, createStyles, withStyles, WithStyles } from '@material-ui/styles'

import axios from 'axios';
import { Dir } from 'fs';

interface Props extends WithStyles<typeof styles>{
    claimInput: string
    resultsListCallback: (r: Array<Array<String>>) => void
}
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
                const data = res.data;
                console.log("Returned res.data", res.data);
                // cancel loading screen.
                this.props.resultsListCallback(res.data['data']);
            }).catch(error => {
                console.log("error", error)
                console.log(error.message)
                console.log()
            })

        //start loading screen.
    
    }
}

const styles = () => createStyles({
    root: {
        margin: '3% 0px 0px 0px'
    }
})

export default withStyles(styles)(SearchButton);