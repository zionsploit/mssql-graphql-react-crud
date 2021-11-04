import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { client } from './gql/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>,
  document.getElementById('root')
);