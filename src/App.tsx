import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClaimInput from './components/ClaimInput';
import SearchButton from './components/SearchButton'
import ResultsList from './components/ResultsList';
import Block from './components/layouts/Block'


class App extends Component{
  handleEnterCallback = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        console.log("Enter key is presseddd.")
        // search
    };
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={3} >
          <Grid item xs={12}>
              <header className="App-header">
              <Typography variant='h1' gutterBottom >Fact Verification System</Typography>
              </header>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="center" wrap="wrap" alignItems="stretch">
          <Grid item xs={11} md={6} lg={4}>
            <ClaimInput enterCallback={this.handleEnterCallback}/>
          </Grid>
          <Grid item>
            <SearchButton/>
          </Grid>
        </Grid>
        <Block height={40}/>
        <Grid container spacing={3} justify="center">
          <Grid item xs={8}><ResultsList/></Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
