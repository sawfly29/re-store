import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import ErrorBoundry from './components/error-boundry'
import BookstoreService from './services/bookstore-service'
import {BookstoreServiceProvider} from './components/bookstore-service-context'
import store from './store'

const bookstoreService = new BookstoreService()

ReactDOM.render(
  <React.StrictMode> 
    <Provider store = {store}>
      <ErrorBoundry>
        <BookstoreServiceProvider value={bookstoreService}>
          <Router>
            <App />
          </Router>
        </BookstoreServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
