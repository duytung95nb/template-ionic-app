import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, useIonViewDidEnter, useIonViewDidLeave,
  useIonViewWillEnter, useIonViewWillLeave
} from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './assets/styles/theme/variables.scss';
import './assets/styles/form.scss';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { purple, green } from '@material-ui/core/colors';
import Login from './pages/Auth/Login';
import InApp from './pages/InApp/InApp';
import { IonReactRouter } from '@ionic/react-router';
import Register from './pages/Auth/Register';

const App: React.FC = () => {
  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
  });

  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired');
  });
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route exact path="/" component={InApp} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
      {/* <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab2/details" component={Details} />
            <Route path="/tab3" component={UserAccountPage} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonReactRouter>

      </IonApp> */}
    </ThemeProvider>
  )
};

export default App;
