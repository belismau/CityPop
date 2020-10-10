import React from 'react';
import './PresentInfo.css'

class PresentInfo extends React.Component {
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
                    <div>
                        <h4> {this.props.countryName} </h4>
                        {this.props.cities.map((city) => (
                            <div key={city}>
                                <p key={city}> {city} </p>
                            </div>
                        ))}
                    </div>
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