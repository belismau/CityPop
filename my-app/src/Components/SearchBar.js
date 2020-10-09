import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor() {
        super()

        this.state = {
            input: null,
            searched: false,
            searchedValue: null
        }

        this.getValue = this.getValue.bind(this)
        this.setSearchValue = this.setSearchValue.bind(this)
    }

    getValue(e) {
        this.setState({
            input: e.target.value
        })
    }

    setSearchValue() {
        this.setState({
            searched: true,
            searchedValue: this.state.input
        })
    }

    render() {
        return (
            <main className="SearchBar">
                <div>
                    <div>
                        <input 
                            type="text"
                            onChange={this.getValue}
                            placeholder={this.props.newPlaceholder}
                        />
                        <div 
                            className="SearchIcon"
                            onClick={this.setSearchValue}>
                            <img
                                src="https://secure.webtoolhub.com/static/resources/icons/set103/ce6535a5.png"
                                alt="Search"
                            />
                        </div>
                    </div>
                </div>

                {this.state.searched ?
                    <p> {this.state.searchedValue}</p> 
                :
                    null
                }

            </main>
        )
    }
}

export default SearchBar;