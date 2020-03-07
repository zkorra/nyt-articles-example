import React, { Component } from 'react'
import { Card, Grid, Image, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'

export default class Article extends Component {

    constructor(props) {
        super(props)
        this.state = {
            article: {}
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

        const { article } = this.state

        let PublishDate = moment(new Date(article.publish)).format('D MMM YYYY [at] h:mm A')

        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={9} computer={9}>

                    <Card fluid>
                        <Card.Content>
                            <Card.Header textAlign='left'>
                                {article.title}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Description textAlign='left'>
                                {article.abstract}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content textAlign='left'>
                            <Icon name='calendar alternate outline' />
                            {PublishDate}
                            <Button href={article.url} floated='right' compact basic animated='fade'>
                                <Button.Content visible>Full Article</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='world' />
                                </Button.Content>
                            </Button>
                        </Card.Content>
                    </Card>

                </Grid.Column>
            </Grid>
        );
    }

}