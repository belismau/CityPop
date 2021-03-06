import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'noInfo': {
        background: 'rgb(155, 155, 155)',
        margin: '0 auto',
        padding: '25px',
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
        }
    }
})

class NoInfo extends React.Component {
    render() {
        return (
            <div className={css(styles.noInfo)}>
                <h1> No result for
                    <span> "{this.props.userInput}" </span>
                </h1>
            </div>
        )
    }
}

export default NoInfo