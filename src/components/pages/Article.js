import React, { Component } from 'react'

export default class Article extends Component {

    constructor(props) {
        super(props)
        this.state = {
            article: []
        }
    }

    componentDidMount() {
        const { data } = this.props.location
        let routeState
        if (data) {
            localStorage.setItem('routeState', JSON.stringify(data))
            routeState = data
        } else {
            routeState = localStorage.getItem('routeState')
            if (routeState) routeState = JSON.parse(routeState)
        }

        this.setState({
            article: routeState
        })
        
    }

    render() {
        return (
            <div>
                {console.log(this.state.article)}
            </div>
        );
    }

}