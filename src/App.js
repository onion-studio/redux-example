import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" exact component={HomePage} />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
