import React from 'react'
import PresentInfo from './PresentInfo'
import {StyleSheet, css} from 'aphrodite-jss'
import icon from '../Components/searchIcon.png';
import arrow from '../Components/arrowBack.png';

const styles = StyleSheet.create({
    'searchBar': {
        padding: '40px 25px',
        backgroundColor: 'rgb(175, 175, 175)',
        borderTop: '2px solid rgb(163, 163, 163)',
        borderBottom: '2px solid rgb(163, 163, 163)',

        '& > div': {
            display: 'flex',
            alignItems: 'center',
            jusitfyContent: 'center',
            flexDirection: 'column',

            '& > p': {
                color: 'rgb(112, 112, 112)',
                marginTop: '10px',
                cursor: 'pointer'
            },

            '& > div': {
                position: 'relative',

                '& > input': {
                    outline: 'none',
                    padding: '10px 20px',
                    border: '1px solid rgb(168, 168, 168)',
                    background: 'rgb(228, 228, 228)',
                    color: 'rgb(97, 97, 97)',
                    borderRadius: '40px',
                    boxShadow: '0 0 2px rgb(112, 112, 112)',
                    width: '250px'
                }
            }
        }
    },

    'searchIcon': {
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)',
        right: '4px',
        padding: '20px',
        height: '30px',
        width: '30px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '40px',

        '& > img': {
            height: '18px',
            width: '18px'
        }
    },
    'previousDiv': {
        cursor: 'pointer',
        maxWidth: '0',
        marginBottom: '15px',
        margin: '0 auto',
        position: 'fixed',
        top: '15px',
        left: '25px',

        '& > img': {
            height: '25px',
            width: '25px'
        }
    }
})

class SearchBar extends React.Component {
    constructor() {
        super()

        this.state = {
            input: null,
            searched: false,
            searchedValue: null,
            loading: false
        }

        this.getInputValue = this.getInputValue.bind(this)
        this.beginSearch = this.beginSearch.bind(this)
    }

    getInputValue(e) {
        this.setState({
            input: e.target.value
        })
    }

    beginSearch() {
        this.addSearchedValue()
        this.resetValues()
        this.addLoader()
        this.fetchData()
    }

    resetValues() {
        this.setState({
            population: [],
            cities: [],
            noInfo: false,
            countryName: ''
        })
    }
    
    addSearchedValue() {
        this.setState({
            searched: true,
            searchedValue: this.state.input,
        })
    }

    findCountry(countryData) {
        let i = 0

        while (i < countryData.length) {
            if (countryData[i].fcode === 'PCLI') {
                this.setState({
                    countryCode: countryData[i].countryCode,
                    countryName: countryData[i].countryName
                })

                this.fetchCountryData()

                return true
            }

            i += 1
        }

        return false
    }

    findCity(cityData) {
        for (let j = 0; j < cityData.length; j++) {
            if (cityData[j].fcode === 'PCLI') {
                break
            }

            if (cityData[j].fcl === 'P') {
                try {
                    if ((this.state.input).toLowerCase() !== (cityData[j].toponymName).toLowerCase()) {
                        break
                    }
                } catch {
                    return false
                }

                this.addPopulationAndCity(
                    this.spaceBetween(cityData[j].population), 
                    cityData[j].toponymName
                )
                
                this.setState({
                    countryName: cityData[j].countryName
                })

                return true
            }
        }

        return false
    }

    addCities(data) {
        for (let i = 0; i < data.length; i++) {
            this.addPopulationAndCity(
                this.spaceBetween(data[i].population),
                data[i].toponymName
            )
        }
    }

    fetchData() {
        fetch('http://api.geonames.org/searchJSON?&q=' + this.state.input + '&username=spopre2')
        .then(res => res.json())
        .then((data) => {

            if (this.props.countrySearch === true) {
                let foundCountry = this.findCountry(data['geonames'])

                if (foundCountry === false) {
                    this.removeLoader()
                    this.addNoInfo(true)
                }
                
            } else {
                let foundCity = this.findCity(data['geonames'])

                if (foundCity === false) {
                    this.addNoInfo(true)
                }
                
                this.removeLoader()
            }
        })
        .catch(console.log)
    }

    fetchCountryData() {
        fetch('http://api.geonames.org/searchJSON?' +
              '&country=' + this.state.countryCode +
              '&featureClass=P' +
              '&maxRows=3' +
              '&orderby=population' +
              '&username=spopre2')
        .then(res => res.json())
        .then((data) => {
            this.removeLoader()
            this.addCities(data['geonames'])
        })
        .catch(console.log)
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

    addNoInfo(value) {
        this.setState({
            noInfo: value
        })
    }

    addLoader() {
        this.setState({
            loading: true
        })
    }

    removeLoader() {
        this.setState({
            loading: false
        })
    }

    addPopulationAndCity(varPopulation, varCities) {
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
            <main className={css(styles.searchBar)}>
                <div
                    onClick={this.props.goToPrevious}
                    className={css(styles.previousDiv)}>
                    <img 
                        src={arrow}
                        alt="arrow"
                    />
                </div>

                <div>
                    <div>
                        <input 
                            type="text" 
                            onChange={this.getInputValue}
                            placeholder={this.props.newPlaceholder}
                        />
                        <div 
                            className={css(styles.searchIcon)}
                            onClick={this.beginSearch}>
                            <img
                                src={icon}
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
                        loading={this.state.loading}
                    />
                :
                    null
                }                
            </main>
        )
    }
}

export default SearchBar;