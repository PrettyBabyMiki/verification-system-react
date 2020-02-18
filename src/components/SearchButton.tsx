import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'

interface Props {
    margin: string
}

const useStyles = makeStyles({
    root: {
        margin: '3% 0px 0px 0px'
    }
});

const search = () => {
    console.log("Send button pressed.")
}

export default function SearchButton(props: Props) {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            endIcon={<Icon>send</Icon>}
            size="large"
            className={classes.root}
            onClick={search}
        >
        Search
        </Button>
    )
}