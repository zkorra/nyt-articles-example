import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Card, Grid, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchBar from '../search/SearchBar'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            page: 0
        }
    }

    componentDidMount = () => {
        this.fetchArticles();
    }

    fetchArticles = () => {
        let pageCount = this.state.page
        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${pageCount}&api-key=BNo7OVOfOzlQaP1AGGoDA4NScDqcWurb`)
            .then((res) => res.json())
            .then((json) => this.setState({ articles: json.response.docs }))
    }

    handlePreviousPage = () => {
        this.setState({
            page: this.state.page - 1
        })
        this.fetchArticles()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
        this.fetchArticles()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    render() {

        let ButtonGroup;

        if (this.state.articles.length !== 0) {
            ButtonGroup =
                <Button.Group compact basic>
                    <Button icon='angle left' onClick={_.debounce(this.handlePreviousPage, 2000)} disabled={this.state.page === 0} />
                    <Button content={this.state.page + 1} />
                    <Button icon='angle right' onClick={_.debounce(this.handleNextPage, 2000)} disabled={this.state.page === 100} />
                </Button.Group>
        }

        return (
            <Grid textAlign='center'>

                <Grid.Row>
                    <SearchBar />
                </Grid.Row>

                {console.log(this.state)}

                <Grid.Column mobile={16} tablet={7} computer={7}>
                    {this.state.articles
                        .map((article, index) => {

                            let PublishDate = moment(new Date(article.pub_date)).format('D MMM YYYY [at] h:mm A')

                            return (
                                <div key={index}>
                                    <Link to={{ pathname: '/article', data: article }}>
                                        <Card className='margin-bottom' link fluid>
                                            {/* <Image src={article.media[0]} wrapped /> */}
                                            <Card.Content>
                                                <Card.Header as='h3' textAlign='left'>
                                                    {article.headline.main}
                                                </Card.Header>
                                                <Card.Meta as='h3' textAlign='left'>
                                                    {article.byline.original}
                                                </Card.Meta>
                                                <Card.Description textAlign='left'>
                                                    {/* {article.abstract} */}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content textAlign='right' extra>
                                                {PublishDate}
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </div>
                            )
                        })}

                    {ButtonGroup}

                </Grid.Column>
            </Grid >
        );
    }

}