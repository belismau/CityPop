import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'resultText': {
        color: 'rgb(210, 210, 210)',
        textAlign: 'center',
        fontSize: '30px',

        '& > span': {
            color: 'white'
        }
    }
});

class ResultText extends React.Component {
    render() {
        return (
            <h1 className={css(styles.resultText)}> Resultat för
                <span> "{this.props.userInput}" </span>
            </h1>
        )
    }
}

export default ResultText;