import React from 'react'
import PresentInfo from './PresentInfo'
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor() {
        super()

        this.state = {
            input: null,
            searched: false,
            searchedValue: null
        }

        this.getValue = this.getValue.bind(this)
        this.setSearchValue = this.setSearchValue.bind(this)
    }

    getValue(e) {
        this.setState({
            input: e.target.value
        })
    }

    setSearchValue() {
        this.setState({
            searched: true,
            searchedValue: this.state.input,
            population: [],
            cities: [],
            noInfo: false,
            countryName: '',
            loading: false
        })

        this.fetchCityInfo()
    }


    fetchCityInfo() {
        fetch('http://api.geonames.org/searchJSON?&q=' + this.state.input + '&maxRows=1&username=spopre2')
        .then(res => res.json())
        .then((data) => {

            let subroot = data['geonames'][0]

            if ((subroot.fclName).substring(0, 4) === 'city') {
                this.setStateForPopAndCity(
                    subroot.population, 
                    subroot.toponymName
                )
                
                this.setState({
                    countryName: subroot.countryName
                })
            } else {
                this.setStateForNoInfo(true)
            }
        })
        .catch(console.log)
    }

    setStateForNoInfo(boolean) {
        this.setState({
            noInfo: boolean
        })
    }

    setStateForPopAndCity(varPopulation, varCities) {
        this.setState({
            population: [
                ...this.state.population,
                varPopulation
            ],
            cities: [
                ...this.state.cities,
                varCities
            ]
        })
    }

    render() {
        return (
            <main className="SearchBar">
                <div>
                    <div>
                        <input 
                            type="text"
                            onChange={this.getValue}
                            placeholder={this.props.newPlaceholder}
                        />
                        <div 
                            className="SearchIcon"
                            onClick={this.setSearchValue}>
                            <img
                                src="https://secure.webtoolhub.com/static/resources/icons/set103/ce6535a5.png"
                                alt="Search"
                            />
                        </div>
                    </div>
                </div>

                {this.state.searched ?
                    <PresentInfo
                        userInput={this.state.searchedValue}
                        population={this.state.population}
                        cities={this.state.cities}
                        noInfo={this.state.noInfo}
                        countryName={this.state.countryName}
                    /> :
                    null
                }

            </main>
        )
    }
}

export default SearchBar;