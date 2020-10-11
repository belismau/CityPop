import React from 'react';
import './PresentInfo.css'

class PresentInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            curPopulation: null,
            curIndex: null,
            curCity: null
        }

        this.getPopulation = this.getPopulation.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    getPopulation(index) {
        this.setState({
            curIndex: index
        })

        // eslint-disable-next-line
        this.props.population.map((popul, popIndex) => {
            if (popIndex === index) {
                this.setState({
                    curPopulation: popul
                })
            }
        });

        // eslint-disable-next-line
        this.props.cities.map((city, cityIndex) => {
            if (cityIndex === index) {
                this.setState({
                    curCity: city
                })
            }
        });
    }

    goBack() {
        this.setState({
            curPopulation: null,
            curIndex: null,
            curCity: null
        })
    }

    render() {
        if (this.props.noInfo) {
            return (
                <div className="PresentInfo">
                    <h1> Inga resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                </div>
            )
        } else if (this.props.countrySearch) {
            return (
                <div className="PresentInfo">
                    <h1> Resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                    {this.state.curPopulation === null ?
                        <div>
                            <h4> {this.props.countryName} </h4>
                            {this.props.cities.map((city, index) => (
                                <div key={city} entry={index} onClick={(e) => this.getPopulation(index)}>
                                    <p key={city}> {city} </p>
                                </div>
                            ))}
                        </div>
                    :
                        <div>
                            <div onClick={this.goBack} id="clickedCity">
                                <p> {this.state.curCity} (Nr {this.state.curIndex + 1}) </p>
                                <p> {this.state.curPopulation} </p>
                            </div>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <div className="PresentInfo">
                    <h1> Resultat för
                        <span> "{this.props.userInput}" </span>
                    </h1>
                    {this.props.cities.map(city => (
                        <h3 key={city}> {city}, {this.props.countryName} </h3>
                    ))}
                    {this.props.population.map(city => (
                        <div id="cityPopulation" key={city}>
                            <p key={city}> {city} </p>
                        </div>
                    ))}
                </div>
            )
        }
    }
}

export default PresentInfo;