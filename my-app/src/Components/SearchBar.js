import React from 'react'
import PresentInfo from './PresentInfo'
import {StyleSheet, css} from 'aphrodite-jss'

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
            loading: true
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
                    if (subroot.fcode === 'PCLI') {
                        this.setState({
                            countryCode: subroot.countryCode,
                            countryName: subroot.countryName
                        })
                        this.fetchCountryInfo()
                    } else {
                        throw new Error()
                    }   
                } catch {
                    this.setState({
                        loading: false,
                    })
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
                this.setState({
                    loading: false,
                })
            }
        })
        .catch(console.log)
    }

    fetchCountryInfo() {
        fetch('http://api.geonames.org/searchJSON?&q=' + this.state.input + '&country=' + this.state.countryCode + '&orderby=population&username=spopre2')
        .then(res => res.json())
        .then((data) => {

            this.setState({
                loading: false,
            })
            
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
            <main className={css(styles.searchBar)}>
                <div>
                    <div>
                        <input 
                            type="text" 
                            onChange={this.getValue}
                            placeholder={this.props.newPlaceholder}
                        />
                        <div 
                            className={css(styles.searchIcon)}
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