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

        '& > div': {
            display: 'flex',
            alignItems: 'center',

            '& > p': {
                color: 'rgb(235, 235, 235)',
                textAlign: 'center',
                background: 'rgb(153, 153, 153)',
                margin: '20px',
                padding: '15px 20px',
                cursor: 'pointer',
                borderRadius: '3px'
            }
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
                <div className={css(styles.chooseSearch)}>
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