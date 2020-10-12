import React from 'react'
import {StyleSheet, css} from 'aphrodite-jss'

const styles = StyleSheet.create({
    'header': {
        background: 'rgb(199, 199, 199)',
        padding: '30px 0',

        '& > h2': {
            color: 'rgb(129, 129, 129)',
            textAlign: 'center'
        }
    }
});

class Header extends React.Component {
    render() {
        return (
            <header className={css(styles.header)}>
                <h2> CityPop </h2>
            </header>
        )
    }
}

export default Header;