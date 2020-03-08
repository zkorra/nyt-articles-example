import React, { Component } from 'react'
import { Grid, Divider, Header, Image } from 'semantic-ui-react'
import SearchBar from '../search/SearchBar'
import PopularArticles from '../articles/Popular'
import LatestArticles from '../articles/Lastest'

export default class Home extends Component {

    componentDidMount = () => {
        window.scrollTo({
            top: 0,
            left: 0
        })
    }

    render() {
        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Column mobile={16} tablet={14} computer={14}>

                        <Image src={require('../img/nytlogo.png')} className='margin-top' size='tiny' centered />

                        <Header as='h1' textAlign='center'>
                            <Header.Content>The New York Times</Header.Content>
                        </Header><br />

                        <SearchBar /><br />

                        <PopularArticles />

                        <Divider />

                        <LatestArticles />

                    </Grid.Column>
                </Grid>
            </div >
        );
    }

}