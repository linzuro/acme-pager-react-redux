import React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import Header from './Header'
import Table from './Table'


class App extends React.Component {
    render() {
        return (
            <HashRouter>
            <Route component={Header} />
            <Route path='/:page?' component={Table}/>
            </HashRouter>
        );
    }
  }

  export default App