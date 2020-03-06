import React, { Component } from 'react'

export default class Article extends Component {
    render() {
        const { data } = this.props.location

        return(
            <div>
                {console.log(data)}
            </div>
        );
    }

}