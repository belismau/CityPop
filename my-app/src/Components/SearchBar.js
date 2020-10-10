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
            countryName: ''
        })

        this.fetchCityInfo()
    }

    fetchCityInfo() {
        fetch('http://api.geonames.org/searchJSON?&q=' + this.state.input + '&maxRows=1&username=spopre2')
        .then(res => res.json())
        .then((data) => {

            let subroot = data['geonames'][0]

            if (this.props.countrySearch === true) {
                try {
                    if ((subroot.fclName).substring(0, 7) === 'country') {
                        this.setState({
                            countryCode: subroot.countryCode,
                            countryName: subroot.countryName
                        })
                        this.fetchCountryInfo()
                    } else {
                        this.setStateForNoInfo(true)
                    }   
                } catch {
                    this.setStateForNoInfo(true)
                }
                
            } else {
                if ((subroot.fclName).substring(0, 4) === 'city') {
                    this.setStateForPopAndCity(
                        this.spaceBetween(subroot.population), 
                        subroot.toponymName
                    )
                    
                    this.setState({
                        countryName: subroot.countryName
                    })
                } else {
                    this.setStateForNoInfo(true)
                }
            }

        })
        .catch(console.log)
    }


    fetchCountryInfo() {
        fetch('http://api.geonames.org/searchJSON?&q=' + this.state.input + '&country=' + this.state.countryCode + '&orderby=population&username=spopre2')
        .then(res => res.json())
        .then((data) => {

            let count = 0
            let root = data['geonames']

            for (let i = 0; i < root.length; i++) {
                if (count < 3) {
                    let subroot = data['geonames'][i]
                    let thisTypeOf = (subroot.fclName).substring(0, 4)

                    if (thisTypeOf === 'city') {
                        this.setStateForPopAndCity(
                            this.spaceBetween(subroot.population),
                            subroot.toponymName
                        )
                        count += 1
                    }
                    
                } else {
                    break
                }
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

    spaceBetween(population) {
        let popuToStr = population.toString()

        if (popuToStr.length < 4) {
            return population
        }

        for (let i = popuToStr.length - 3; i > 0; i -= 3) {
            popuToStr = popuToStr.substring(0, i) + ' ' + popuToStr.substring(i);
        }

        return popuToStr
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
                        countrySearch={this.props.countrySearch}
                    /> :
                    null
                }

            </main>
        )
    }
}

export default SearchBar;