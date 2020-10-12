import React from 'react';
import {StyleSheet, css} from 'aphrodite-jss';
import Loader from './Loader';
import NoInfo from './NoInfo';
import ShowCities from './ShowCities';
import ShowCityPopulation from './ShowCityPopulation';

const styles = StyleSheet.create({
    'presentInfo': {
        background: 'rgb(155, 155, 155)',
        margin: '0 auto',
        padding: '40px 25px',
        maxWidth: '700px',
        borderRadius: '4px',
        marginTop: '40px',

        '& > h1': {
            color: 'rgb(210, 210, 210)',
            textAlign: 'center',
            fontSize: '30px',

            '& > span': {
                color: 'white'
            }
        },

        '& > div': {
            '@media screen and (max-width: 550px)': {
                minWidth: '100%'
            }
        }
    }
});

class PresentInfo extends React.Component {
    render() {
        if (this.props.loading) {
            return (
                <Loader />
            )
        }

        if (this.props.noInfo) {
            return (
                <NoInfo 
                    userInput={this.props.userInput}
                />
            )
        }

        if (this.props.countrySearch) {
            return (
                <div className={css(styles.presentInfo)}>
                    <h1> Resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                    <ShowCities 
                        countryName={this.props.countryName}
                        cities={this.props.cities}
                        population={this.props.population}
                    />
                </div>
            )
        }
        
        return (
            <div className={css(styles.presentInfo)}>
                <h1> Resultat för
                    <span> "{this.props.userInput}" </span>
                </h1>
                <ShowCityPopulation
                    goBack={null}
                    curCity={this.props.cities}
                    curIndex={null}
                    curPopulation={this.props.population}
                    countryName={this.props.countryName}
                />
            </div>
        )
    }
}

export default PresentInfo;