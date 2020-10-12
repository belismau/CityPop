import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'
import ShowCityPopulation from './ShowCityPopulation';

const styles = StyleSheet.create({
    'showCities': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        color: 'white',
        background: 'rgb(102, 102, 102)',
        minWidth: '280px',
        gap: '3px',
        marginTop: '20px',

        '& > h4': {
            color: 'rgb(73, 73, 73)',
            background: 'rgb(109, 109, 109)',
            textAlign: 'center',
            padding: '20px',
            textTransform: 'uppercase'
        },

        '& > div': {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgb(124, 124, 124)',
            cursor: 'pointer',
            margin: '0'
        },

        '@media screen and (max-width: 550px)': {
            minWidth: '100%'
        }
    }
})

class ShowCities extends React.Component {
    constructor() {
        super()

        this.state = {
            curPopulation: null,
            curIndex: null,
            curCity: null
        }

        this.getInfoAboutCity = this.getInfoAboutCity.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    getInfoAboutCity(index) {
        this.addIndex(index)

        // eslint-disable-next-line
        this.props.population.map((popul, popIndex) => {
            if (popIndex === index) {
                this.addPopulation(popul)
            }
        });

        // eslint-disable-next-line
        this.props.cities.map((city, cityIndex) => {
            if (cityIndex === index) {
                this.addCity(city)
            }
        });
    }

    addIndex(nr) {
        this.setState({
            curIndex: nr
        })
    }

    addPopulation(nr) {
        this.setState({
            curPopulation: nr
        })
    }

    addCity(nr) {
        this.setState({
            curCity: nr
        })
    }

    goBack() {
        this.setState({
            curPopulation: null,
            curIndex: null,
            curCity: null
        })
    }

    render() {
        if (this.state.curPopulation === null) {
            return (
                <div className={css(styles.showCities)}>
                    <h4> {this.props.countryName} </h4>
                    {this.props.cities.map((city, index) => (
                        <div 
                            key={city} 
                            entry={index} 
                            onClick={(e) => this.getInfoAboutCity(index)}>
                            <p key={city}> {city} </p>
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <ShowCityPopulation
                goBack={this.goBack}
                curCity={this.state.curCity}
                curIndex={this.state.curIndex}
                curPopulation={this.state.curPopulation}
            />
        )
    }
}

export default ShowCities;