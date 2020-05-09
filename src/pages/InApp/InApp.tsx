import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import Home from './Home';
import Tab2 from './Tab2';
import Details from './Details';
import UserAccount from './UserAccount';
import { person, apps, home } from 'ionicons/icons';

export default class InApp extends React.Component {
    render() {
        return (
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/home" component={Home} exact={true} />
                  <Route path="/tab2" component={Tab2} exact={true} />
                  <Route path="/tab2/details" component={Details} />
                  <Route path="/account" component={UserAccount} />
                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={apps} />
                    <IonLabel>Tab Two</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="account" href="/account">
                    <IonIcon icon={person} />
                    <IonLabel>Account</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>);
    }
}