import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Card, Grid, Divider, Icon, Button, Header, Loader, Modal, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
import PopularArticles from '../articles/Popular'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            page: 0,
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.fetchArticles();
    }

    fetchArticles = () => {
        let pageCount = this.state.page
        let dateNow = moment().format("YYYYMMDD")
        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${pageCount}&end_date=${dateNow}&sort=newest&api-key=BNo7OVOfOzlQaP1AGGoDA4NScDqcWurb`)
            .then((res) => res.json())
            .then((json) => this.setState({
                articles: json.response.docs
            }))
            .then(() => this.setState({
                isLoading: false
            }))
    }

    handlePreviousPage = () => {
        this.setState({
            page: this.state.page - 1,
            isLoading: true
        })
        this.fetchArticles()
        document.getElementById("popular").scrollIntoView({ behavior: "smooth" });
    }

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1,
            isLoading: true
        })
        this.fetchArticles()
        document.getElementById("latest").scrollIntoView({ behavior: "smooth" });
    }

    render() {

        let ButtonGroup;
        let LoadingModal =
            <Modal
                open={this.state.isLoading}
                className="modal"
                size='mini'
                basic
            >
                <Loader size='large' active inline='centered'><p>wait a second</p></Loader>
            </Modal>

        if (this.state.articles.length !== 0) {
            ButtonGroup =
                <Button.Group compact basic>
                    <Button icon='angle left' onClick={_.debounce(this.handlePreviousPage, 1500)} disabled={this.state.page === 0} />
                    <Button content={this.state.page + 1} />
                    <Button icon='angle right' onClick={_.debounce(this.handleNextPage, 1500)} disabled={this.state.page === 100} />
                </Button.Group>
        }

        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Column mobile={16} tablet={14} computer={14}>

                        <Image src={require('../img/nytlogo.png')} className='margin-top' size='tiny' centered />

                        <Header as='h1' textAlign='center'>
                            <Header.Content>The New York Times</Header.Content>
                        </Header><br />

                        <SearchBar />

                        <Header id='popular' as='h2'>
                            <Icon name='star outline' />
                            <Header.Content>The Most Popular Articles</Header.Content>
                        </Header><br />

                        <PopularArticles />

                        <Divider />

                        <Header id='latest' as='h2'>
                            <Icon name='newspaper outline' />
                            <Header.Content>The Latest Articles</Header.Content>
                        </Header><br />

                        <Grid textAlign='center'>
                            <Grid.Column mobile={16} tablet={9} computer={9}>
                                {this.state.articles
                                    .map((article, index) => {

                                        let PublishDate = moment(new Date(article.pub_date)).format('D MMM YYYY [at] h:mm A')

                                        return (
                                            <div key={index}>
                                                <Link to={{
                                                    pathname: '/article',
                                                    data: {
                                                        title: article.headline.main,
                                                        section: article.section_name,
                                                        abstract: article.abstract,
                                                        byline: article.byline.original,
                                                        publish: article.pub_date,
                                                        url: article.web_url
                                                    }
                                                }}>
                                                    <Card className='margin-bottom' link fluid>
                                                        <Card.Content>
                                                            <Card.Header textAlign='left'>
                                                                {article.headline.main}
                                                            </Card.Header>
                                                            <Card.Meta textAlign='left'>
                                                                {article.section_name}
                                                            </Card.Meta>
                                                            <Card.Description textAlign='left'>
                                                                {article.abstract}
                                                            </Card.Description>
                                                        </Card.Content>
                                                        <Card.Content extra>
                                                            <Grid >
                                                                <Grid.Row columns={2}>
                                                                    <Grid.Column textAlign='left'>
                                                                        {article.byline.original}
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
                                        )
                                    })}

                                {ButtonGroup}

                                {LoadingModal}

                            </Grid.Column>
                        </Grid>

                    </Grid.Column>
                </Grid>
            </div >
        );
    }

}