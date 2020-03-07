import React, { Component } from 'react'
import { Card, Grid, Image, Icon, Button } from 'semantic-ui-react'

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


        console.log(article)

        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={9} computer={9}>

                    <Card fluid>
                        {/* <Image src={this.state.pictureurl} wrapped /> */}
                        <Card.Content>
                            <Card.Header textAlign='center'>
                                {article.headline && article.headline.main}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Description textAlign='left'>
                                {article.abstract}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content as='h6' textAlign='left'>
                            <Icon name='tag' />
                            {/* {price} THB / DAY */}
                        <Button href={article.web_url} floated='right' color='blue' animated>
                                <Button.Content visible>Continue Reading</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='paper plane right' />
                                </Button.Content>
                            </Button>
                        </Card.Content>
                    </Card>

                </Grid.Column>
            </Grid>
        );
    }

}