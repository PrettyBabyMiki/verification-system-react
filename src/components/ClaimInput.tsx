import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//     root: {}
// })

const textOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
}

function enterPressed(e: React.KeyboardEvent) {
    if (e.key == "Enter") {
        console.log("Enter key is pressed.")
    };
}

export default function ClaimInput() {
    // const classes = useStyles();
    return (
        <TextField id='claim-input' 
        variant='outlined'
        type='search'
        size='medium'
        fullWidth
        autoFocus
        placeholder="Enter a claim."
        helperText="e.g. Robert Downey Junior is Iron man."
        onChange={textOnChange}
        onKeyPress={enterPressed}
        />
    );
};