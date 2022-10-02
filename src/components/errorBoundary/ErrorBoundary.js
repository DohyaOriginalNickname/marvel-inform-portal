import { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({error: true})
    }


    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        return this.props.children
    }
}