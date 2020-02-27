import React, { HtmlHTMLAttributes } from 'react';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//     root: {}
// })

const textOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
}

function enterPressed(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
        console.log("Enter key is pressed.")
    };
}

interface Props {
    handleInputCallback: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnterCallback: (e: React.KeyboardEvent) => void
}

export default function ClaimInput(props:Props) {
    return (
        <TextField id='claim-input' 
        variant='outlined'
        type='search'
        size='medium'
        fullWidth
        autoFocus
        placeholder="Enter a claim."
        helperText="e.g. Robert Downey Junior is Iron man."
        onChange={props.handleInputCallback}
        onKeyPress={props.handleEnterCallback}
        />
    );
};