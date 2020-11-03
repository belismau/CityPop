import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'clickedCity': {
        fontSize: '20px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '300px',

        '& > p': {
            color: 'rgb(216, 216, 216)',

            '& > span': {
                color: 'white'
            }
        },

        '& > div': {
            marginTop: '30px',
            background: '#929292',
            color: '#6f6f6f',
            padding: '10px 25px',
            cursor: 'pointer',
            display: 'inline-block'
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
    }
});

class ShowCityPopulation extends React.Component {
    render() {
        return (
            <div>
                {this.props.curIndex != null ?
                    <div
                        className={css(styles.clickedCity)}>
                        <p> Population in the city called 
                            <span> {this.props.curCity} </span> is 
                            <span> {this.props.curPopulation}</span>.
                        </p>
                        <div onClick={this.props.goBack}> Go back </div>
                    </div>
                :
                    <div className={css(styles.clickedCity)}>
                        <p> Population in the city called 
                            <span> {this.props.curCity} </span> is 
                            <span> {this.props.curPopulation}</span>.
                        </p>
                    </div>
                }
            </div>
        )
    }
}

export default ShowCityPopulation;