import React from 'react';
import Header from './Header'
import ChooseSearch from './ChooseSearch';

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