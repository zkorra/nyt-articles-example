import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Card, Grid, Button, Transition } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            popularArticles: [],
            startArticle: 0,
            endArticle: 3
        }
    }

    componentDidMount = () => {
        this.fetchPopularArticles();
    }

    fetchPopularArticles = () => {
        fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=tLIr1saQ4pDKCR6wL7kp7LzdqvUen77i`)
            .then((res) => res.json())
            .then((json) => this.setState({ popularArticles: json.results }))
    }

    handlePreviousPage = () => {
        this.setState({
            startArticle: this.state.startArticle - 4,
            endArticle: this.state.endArticle - 4
        })
    }

    handleNextPage = () => {
        this.setState({
            startArticle: this.state.startArticle + 4,
            endArticle: this.state.endArticle + 4
        })
    }

    render() {
        const { startArticle, endArticle } = this.state

        let ButtonGroup;

        if (this.state.popularArticles.length !== 0) {
            ButtonGroup =
                <Grid>
                    <Grid.Column textAlign='right'>
                        <Button
                            basic
                            icon='angle left'
                            className='border-circular'
                            onClick={_.debounce(this.handlePreviousPage, 250)}
                            disabled={this.state.startArticle === 0}
                        />
                        <Button
                            basic
                            icon='angle right'
                            className='border-circular'
                            onClick={_.debounce(this.handleNextPage, 250)}
                            disabled={this.state.endArticle === 19}
                        />
                    </Grid.Column>
                </Grid>
        }


        return (
            <div>
                <Grid columns={4}>

                    {this.state.popularArticles
                        .map((article, index) => {
                            if (index >= startArticle && index <= endArticle) {

                                let PublishDate = moment(new Date(article.published_date)).format('D MMM YYYY')

                                return (
                                    <Transition
                                        animation='fade'
                                        duration={1750}
                                        transitionOnMount={true}
                                    >
                                        <Grid.Column mobile={16} tablet={8} computer={4}>
                                            <div key={index}>
                                                <Link to={{
                                                    pathname: '/article',
                                                    data: {
                                                        title: article.title,
                                                        section: article.section,
                                                        abstract: article.abstract,
                                                        byline: article.byline,
                                                        publish: article.published_date,
                                                        url: article.url
                                                    }
                                                }}>
                                                    <Card link fluid>
                                                        <Card.Content>
                                                            <Card.Header textAlign='left'>
                                                                {article.title}
                                                            </Card.Header>
                                                            <Card.Meta textAlign='left'>
                                                                {article.section}
                                                            </Card.Meta>
                                                            <Card.Description textAlign='left'>
                                                                {article.abstract}
                                                            </Card.Description>
                                                        </Card.Content>
                                                        <Card.Content extra>
                                                            <Grid >
                                                                <Grid.Row columns={2}>
                                                                    <Grid.Column textAlign='left'>
                                                                        {article.byline}
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='right'>
                                                                        {PublishDate}
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                            </Grid>
                                                        </Card.Content>
                                                    </Card>
                                                </Link>
                                            </div>
                                        </Grid.Column>
                                    </Transition>
                                )
                            } else { return (null) }
                        })}

                </Grid>

                {ButtonGroup}

            </div>
        );
    }

}