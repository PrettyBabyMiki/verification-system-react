import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//     root: {}
// })

const textOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
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
        onChange={textOnChange}
        />
    );
};