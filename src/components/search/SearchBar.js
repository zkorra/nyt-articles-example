import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Icon, Grid, Dropdown, GridColumn } from 'semantic-ui-react'

export default class SearchBar extends Component {

    constructor(props) {
        super(props)
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
                .then(() => this.setState({ isLoading: false }))
        } else {
            this.setState({ 
                articles: [],
                isLoading: false
            })
        }
    }

    resultRenderer = ({ abstract }) => {
        return (
            <div>{abstract}</div>
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

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    render() {

        const filters = [
            { key: 'r', text: 'relevance', value: 'relevance' },
            { key: 'n', text: 'newest', value: 'newest' },
            { key: 'o', text: 'oldest', value: 'oldest' }
          ];

        return (
            <Grid>
                <Grid.Row>
                    <Search
                        loading={this.state.isLoading}
                        onSearchChange={_.debounce(this.onSearchChange, 500)}
                        results={this.state.articles}
                        resultRenderer={this.resultRenderer}
                    />
                    <Dropdown
                        text='Filter'
                        icon='filter'
                        floating
                        labeled
                        button
                        className='icon'
                        options={filters}
                        onChange={this.onFilterChange}
                    >
                    </Dropdown>
                </Grid.Row>
            </Grid>
        );
    }

}