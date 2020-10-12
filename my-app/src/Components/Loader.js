import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
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

class Loader extends React.Component {
    render() {
        return (
            <div className={css(styles.loader)}>
                <p> Loading... </p>
            </div>
        )
    }
}

export default Loader;