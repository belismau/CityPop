import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
    render() {
        return (
            <main className="SearchBar">
                <div>
                    <div>
                        <input 
                            type="text"
                            placeholder={this.props.newPlaceholder}
                        />
                        <div 
                            className="SearchIcon">
                            <img
                                src="https://secure.webtoolhub.com/static/resources/icons/set103/ce6535a5.png"
                                alt="Search"
                            />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default SearchBar;