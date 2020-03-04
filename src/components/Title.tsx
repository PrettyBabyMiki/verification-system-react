import React from 'react';
import {Typography} from '@material-ui/core'
import {CSSTransition} from 'react-transition-group';
import '../css/animate.css'

interface Props {}
interface State {
    enter: boolean;
}

class Title extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            enter: false,
        }
        // window.setTimeout(this.toggleEnterTitle, 1000)
    }

    render() {
        return (
            <CSSTransition
                in={this.state.enter} timeout={500}
                classNames='fade'
            >
                <Typography variant='h1' gutterBottom>Fact Verification System</Typography>
            </CSSTransition>
        );
    }

    toggleEnterTitle = () => {
        this.setState({
            ...this.state,
            enter: true
        })
    }
}

export default Title;