import React, { Component } from 'react';
import { routeCodes } from 'constants/routes';
import createHistory from "history/createBrowserHistory"

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlesearchTermChange = this.handlesearchTermChange.bind(this);
        this.state = {value: ''};
    }

    handleSearch(e) {
        e.preventDefault();
        console.log(this.state.value);
        this.history = createHistory();
        this.history.replace('products/?q=' + this.state.value, { some: 'state' });
        this.props.getProducts(this.state.value);
    }

    handlesearchTermChange(e) {
        this.setState({value: e.target.value});
    }
    
    render() {
        return (
                <fieldset>
                    <form onSubmit={this.handleSearch}>
                        <input value={ this.state.value } name="searchTerm" onChange={this.handlesearchTermChange}/>
                        <input type='submit' value='Search' />
                    </form>
                </fieldset>
        );
    }
}