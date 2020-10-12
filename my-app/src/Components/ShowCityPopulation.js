import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'clickedCity': {
        fontSize: '20px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgb(124, 124, 124)',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '1fr',
        color: 'white',
        minWidth: '280px',
        gap: '3px',
        marginTop: '20px',

        '& > p:nth-child(1)': {
            color: 'rgb(221, 221, 221)'
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
                        onClick={this.props.goBack}
                        className={css(styles.clickedCity)}>
                        <p> {this.props.curCity} (Nr {this.props.curIndex + 1}) </p>
                        <p> {this.props.curPopulation} </p>
                    </div>
                :
                    <div className={css(styles.clickedCity)}>
                        <p> {this.props.curCity} </p>
                        <p> {this.props.curPopulation} </p>
                    </div>
                }
            </div>
        )
    }
}

export default ShowCityPopulation;