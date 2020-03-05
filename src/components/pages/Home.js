import React, { Component } from 'react'
import { Card, Grid, Image, Icon, Button, GridRow } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchBar from '../search/SearchBar'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount = () => {
        this.fetchArticles();
    }

    fetchArticles = () => {
        let currentState = this.state.articles
        fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=BNo7OVOfOzlQaP1AGGoDA4NScDqcWurb`)
            .then((res) => res.json())
            .then((json) => this.setState({ articles: currentState.concat(json.results) }))
    }

    render() {
        return (
            <Grid textAlign='center'>
                
                <GridRow>
                    <SearchBar />
                </GridRow>

                <Grid.Column mobile={16} tablet={7} computer={7}>

                    {this.state.articles
                        .map((article, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/booking/${article.slug_name}`}>
                                        <Card link fluid>
                                            {/* <Image src={article.pictureurl} wrapped /> */}
                                            <Card.Content>
                                                <Card.Header as='h3' textAlign='left'>
                                                    {article.title}
                                                </Card.Header>
                                                <Card.Description textAlign='left'>
                                                    {article.abstract}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </div>
                            )
                        })}
                </Grid.Column>
            </Grid>
        );
    }

}