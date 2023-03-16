import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'devextreme/dist/css/dx.material.blue.light.css';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import './theme/devextreme.css';
import 'react-notifications/lib/notifications.css';
import configureStore, { history } from './redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import Routes from './routes';
export const store = configureStore();
am4core.useTheme(am4themes_animated);
const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContextProvider>
        <AppWrapper>
          <Switch>
            <Routes />
          </Switch>
        </AppWrapper>
      </AppContextProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
