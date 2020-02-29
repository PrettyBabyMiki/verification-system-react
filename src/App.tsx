import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClaimInput from './components/ClaimInput';
import SearchButton from './components/SearchButton'
import ResultsList from './components/ResultsList';
import Block from './components/layouts/Block'
import ReactLoading from 'react-loading';

interface State {
  toggleLoading: boolean;
}
interface Props {
}


class App extends Component<Props, State>{
  // lifecycle: called before rendering
  constructor(props: Props, state:State){
    super(props, state);
    this.state = {
      toggleLoading: false
    }
  }


  handleEnterCallback = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
        console.log("Enter key is presseddd.")
        // search
    };
  }

  toggleLoadingCallback = (loading: boolean) => {
    this.setState({
      toggleLoading: loading
    })
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
            <ClaimInput enterCallback={this.handleEnterCallback} toggleLoadingCallback={this.toggleLoadingCallback}/>
          </Grid>
          <Grid item>
            <SearchButton toggleLoadingCallback={this.toggleLoadingCallback}/>
          </Grid>
        </Grid>
        <Grid container spacing={10} justify='center'>
        <Grid item>
          {this.toggleLoading()}
        </Grid>
        </Grid>
        <Block height={40}/>
        <Grid container spacing={3} justify="center">
          <Grid item xs={8}><ResultsList/></Grid>
        </Grid>
        
      </div>
    );
  }

  toggleLoading = () => {
    console.log(this.state);
    
    if (this.state.toggleLoading){
      return (<ReactLoading type={'bars'} color={'#D5D5D5'} height={40} width={60}/>)
    }
  }
}

export default App;
