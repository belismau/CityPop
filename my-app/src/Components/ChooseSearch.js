import React from 'react'
import SearchBar from './SearchBar'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'chooseSearch': {
        background: 'rgb(175, 175, 175)',
        borderTop: '2px solid rgb(163, 163, 163)',
        borderBottom: '2px solid rgb(163, 163, 163)',
        minHeight: '150px',
        display: 'flex',
        justifyContent: 'center',

        '@media screen and (max-width: 500px)': {
            flexDirection: 'column',
            minWidth: 'unset',
        },
    },
    
    'chooseSearchBox': {
        '@media screen and (max-width: 500px)': {
            display: 'unset'
        },

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    'cityBox': {
        color: 'rgb(222, 222, 222)',
        textAlign: 'center',
        background: 'rgb(160, 160, 160)',
        margin: '20px',
        padding: '15px 25px',
        cursor: 'pointer',
        borderRadius: '3px',

        '@media screen and (max-width: 500px)': {
            marginLeft: '30px',
            marginRight: '30px',
            marginBottom: '10px'
        }
    },

    'countryBox': {
        color: 'rgb(222, 222, 222)',
        textAlign: 'center',
        background: 'rgb(160, 160, 160)',
        margin: '20px',
        padding: '15px 25px',
        cursor: 'pointer',
        borderRadius: '3px',

        '@media screen and (max-width: 500px)': {
            marginLeft: '30px',
            marginRight: '30px',
            marginTop: '10px'
        }
    }
});

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
        this.goToPrevious = this.goToPrevious.bind(this)
    }

    searchByCity() {
        this.setState({
            chosen: true,
            placeholder: 'Enter a city...',
            countrySearch: false,
            previous: false
        })
    }

    searchByCountry() {
        this.setState({
            chosen: true,
            placeholder: 'Enter a country...',
            countrySearch: true,
            previous: false
        })
    }

    goToPrevious() {
        this.setState({
            previous: true
        })
    }
    
    render() {
        if (this.state.previous || this.state.chosen === false) {
            return (
                <div className={css(styles.chooseSearch)}>
                    <div className={css(styles.chooseSearchBox)}> 
                        <p 
                            className={css(styles.cityBox)} 
                            onClick={this.searchByCity}> 
                            Search by city 
                        </p>
                    </div>
                    <div className={css(styles.chooseSearchBox)}> 
                        <p 
                            className={css(styles.countryBox)} 
                            onClick={this.searchByCountry}> 
                            Search by country 
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <SearchBar
                    goToPrevious={this.goToPrevious}
                    newPlaceholder={this.state.placeholder}
                    countrySearch={this.state.countrySearch}
                />
            )
        }
    }
}

export default ChooseSearch