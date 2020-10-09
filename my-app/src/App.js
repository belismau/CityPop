import React from 'react';
import Header from './Components/Header'
import ChooseSearch from './Components/ChooseSearch';

class App extends React.Component {
    render() {
        return (
          <div>
            <Header />
            <ChooseSearch />
          </div>
        )
    }
}

export default App;