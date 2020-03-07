import _ from 'lodash'
import React, { Component } from 'react'
import moment from 'moment'
import { Search, Grid, Dropdown, Icon, Item, Select } from 'semantic-ui-react'

export default class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            articles: [],
            query: '',
            sort: 'relevance',
            isLoading: false
        }
    }

    updateArticles = () => {
        this.fetchArticles()
    }

    fetchArticles = () => {
        let query = this.state.query
        let sort = this.state.sort
        if (query.length > 1) {
            fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=${sort}&api-key=BNo7OVOfOzlQaP1AGGoDA4NScDqcWurb`)
                .then((res) => res.json())
                .then((json) => this.setState({ articles: json.response.docs }))
                .then(() => this.setState({
                    isLoading: false
                }))
        } else {
            this.setState({
                articles: [],
                isLoading: false
            })
        }
    }

    resultRenderer = ({ headline, snippet, pub_date }) => {

        let PublishDate = moment(new Date(pub_date)).format('D MMM YYYY')

        return (
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header>{headline.main}</Item.Header>
                        <Item.Meta>{snippet}</Item.Meta>
                        <Item.Extra>{PublishDate}</Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        );
    }

    onSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true,
            query: value
        })
        this.updateArticles()
    }

    onFilterChange = (e, { value }) => {
        this.inputRef.current.focus()
        let query = this.state.query
        if (query.length > 1) {
            this.setState({
                isLoading: true
            })
        }
        this.setState({
            sort: value
        })
        this.updateArticles()
    }

    render() {

        const filters = [
            { key: 'r', text: 'Relevance', value: 'relevance' },
            { key: 'n', text: 'Newest', value: 'newest' },
            { key: 'o', text: 'Oldest', value: 'oldest' }
        ];

        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column mobile={13} tablet={6} computer={6} >
                        <Search
                            fluid
                            input={{
                                fluid: true,
                                ref: this.inputRef
                            }}
                            loading={this.state.isLoading}
                            onSearchChange={_.debounce(this.onSearchChange, 500)}
                            results={this.state.articles}
                            resultRenderer={this.resultRenderer}
                        />
                    </Grid.Column>
                    <Dropdown
                        basic
                        text=' '
                        icon='filter'
                        floating
                        button
                        className='icon border-circular'
                        pointing='top left'
                        options={filters}
                        onChange={_.debounce(this.onFilterChange, 500)}
                    />
                </Grid.Row>
            </Grid>
        );
    }

}