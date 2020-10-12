import React from 'react';
import {StyleSheet, css} from 'aphrodite-jss';

const styles = StyleSheet.create({
    'presentInfo': {
        background: 'rgb(144, 144, 144)',
        margin: '0 auto',
        padding: '25px',
        maxWidth: '700px',
        borderRadius: '4px',
        marginTop: '40px',

        '& > h1': {
            color: 'rgb(211, 211, 211)',
            textAlign: 'center',
            fontSize: '30px',

            '& > span': {
                color: 'white'
            }
        },

        '& > h3': {
            color: 'rgb(214, 214, 214)',
            marginTop: '20px',
            fontSize: '16px'
        },

        '& > div': {
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
                width: '100%'
            }
        }
    },

    'cityPopulation': {
        display: 'unset',
        minWidth: '150px',
        background: 'rgb(102, 102, 102)',
        marginTop: '10px',

        '& > p': {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgb(124, 124, 124)'
        }
    },

    'clickedCity': {
        fontSize: '20px',

        '& > p:nth-child(1)': {
            color: 'rgb(221, 221, 221)'
        }
    },

    'loader': {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(51, 51, 51)',
        opacity: '.5'
    }
})

class PresentInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            curPopulation: null,
            curIndex: null,
            curCity: null
        }

        this.getPopulation = this.getPopulation.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    getPopulation(index) {

        this.setState({
            curIndex: index
        })

        // eslint-disable-next-line
        this.props.population.map((popul, popIndex) => {
            if (popIndex === index) {
                this.setState({
                    curPopulation: popul
                })
            }
        });

        // eslint-disable-next-line
        this.props.cities.map((city, cityIndex) => {
            if (cityIndex === index) {
                this.setState({
                    curCity: city
                })
            }
        });
    }

    goBack() {
        this.setState({
            curPopulation: null,
            curIndex: null,
            curCity: null
        })
    }

    render() {
        if (this.props.loading) {
            return (
                <div className={css(styles.loader)}>
                    <p> Loading... </p>
                </div>
            )
        }
        if (this.props.noInfo) {
            return (
                <div className={css(styles.presentInfo)}>
                    <h1> Inga resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                </div>
            )
        } else if (this.props.countrySearch) {
            return (
                
                <div className={css(styles.presentInfo)}>
                    <h1> Resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                    {this.state.curPopulation === null ?
                        <div>
                            <h4> {this.props.countryName} </h4>
                            {this.props.cities.map((city, index) => (
                                <div key={city} entry={index} onClick={(e) => this.getPopulation(index)}>
                                    <p key={city}> {city} </p>
                                </div>
                            ))}
                        </div>
                    :
                        <div>
                            <div onClick={this.goBack} className={css(styles.clickedCity)}>
                                <p> {this.state.curCity} (Nr {this.state.curIndex + 1}) </p>
                                <p> {this.state.curPopulation} </p>
                            </div>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <div className={css(styles.presentInfo)}>
                    <h1> Resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                    {this.props.cities.map(city => (
                        <h3 key={city}> {city}, {this.props.countryName} </h3>
                    ))}
                    {this.props.population.map(city => (
                        <div className={css(styles.cityPopulation)} key={city}>
                            <p key={city}> {city} </p>
                        </div>
                    ))}
                </div>
            )
        }
    }
}

export default PresentInfo;