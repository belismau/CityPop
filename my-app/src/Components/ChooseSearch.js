import React from 'react'
import './ChooseSearch.css'

class ChooseSearch extends React.Component {
    render() {
        return (
            <div className="ChooseSearch">
                <div onClick={this.searchByCity}> 
                    <p> Search by city </p>
                </div>
                <div onClick={this.searchByCountry}> 
                    <p> Search by country </p>
                </div>
            </div>
        )
    }
}

export default ChooseSearch