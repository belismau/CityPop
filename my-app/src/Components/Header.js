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
    },
    'subheader': {
        color: 'rgb(129, 129, 129)',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '10px',
        padding: '0 30px'
    }
});

class Header extends React.Component {
    render() {
        return (
            <header className={css(styles.header)}>
                <h2> CityPop </h2>
                <div className={css(styles.subheader)}>
                    <p> 
                        A web application that presents the 
                        population of a city or top three 
                        largest cities in a country.
                    </p>
                </div>
            </header>
        )
    }
}

export default Header;