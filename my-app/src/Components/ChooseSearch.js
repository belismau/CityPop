import React from 'react'
import './ChooseSearch.css'
import SearchBar from './SearchBar'

class ChooseSearch extends React.Component {
    constructor() {
        super()
        this.state = {
            chosen: false,
            placeholder: '',
            countrySearch: false
        }

        this.searchByCity = this.searchByCity.bind(this)
        this.searchByCountry = this.searchByCountry.bind(this)
    }

    searchByCity() {
        this.setState({
            chosen: true,
            placeholder: 'Enter a city...',
            countrySearch: false
        })
    }

    searchByCountry() {
        this.setState({
            chosen: true,
            placeholder: 'Enter a country...',
            countrySearch: true
        })
    }
    
    render() {
        if (this.state.chosen === false) {
            return (
                <div className="ChooseSearch">
                    <div onClick={this.searchByCity}> 
                        <p> Search by city </p>
                    </div>
                    <div onClick={this.searchByCountry}> 
                        <p> Search by country </p>
                    </div>
                </div>
            )
        } else {
            return (
                <SearchBar 
                    newPlaceholder={this.state.placeholder}
                    countrySearch={this.state.countrySearch}
                />
            )
        }
    }
}

export default ChooseSearch