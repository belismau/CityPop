import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'resultText': {
        color: 'rgb(210, 210, 210)',
        textAlign: 'center',
        fontSize: '30px',
        borderBottom: '4px solid rgb(177, 177, 177)',
        marginBottom: '15px',
        paddingBottom: '7px',

        '@media screen and (max-width: 500px)': {
            fontSize: '25px'
        },

        '& > span': {
            color: 'white'
        }
    }
});

class ResultText extends React.Component {
    render() {
        return (
            <h1 className={css(styles.resultText)}> Result for
                <span> "{this.props.userInput}" </span>
            </h1>
        )
    }
}

export default ResultText;