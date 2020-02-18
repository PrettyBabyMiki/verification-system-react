import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClaimInput from './components/ClaimInput';
import SearchButton from './components/SearchButton'
import ResultsList from './components/ResultsList';
import Block from './components/layouts/Block'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: ''
  },
  sendButton: {
    margin: "1px"
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Grid container spacing={3} >
        <Grid item xs={12}>
            <header className="App-header">
            <Typography variant='h1' gutterBottom className={classes.root}>Fact Verification System</Typography>
            </header>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center" wrap="wrap" alignItems="stretch">
        <Grid item xs={11} md={6} lg={4}>
          <ClaimInput/>
        </Grid>
        <Grid item>
          <SearchButton margin="1px"/>
        </Grid>
      </Grid>
      <Block height={40}/>
      <Grid container spacing={3} justify="center">
        <Grid item xs={8}><ResultsList></ResultsList></Grid>
      </Grid>
    </div>
  );
}

export default App;
