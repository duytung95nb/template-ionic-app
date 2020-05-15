import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import Home from './Home';
import Tab2 from './Tab2';
import Details from './Details';
import UserAccount from './UserAccount';
import { person, apps, home } from 'ionicons/icons';
interface InAppProps {
  match: {
    isExact: true
    params: {}
    path: "/in-app"
    url: "/in-app"
  }
}
export default class InApp extends React.Component<InAppProps> {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const parentRoute = this.props.match.path;
    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path={`${parentRoute}`}><Home/></Route>
            <Route path={`${parentRoute}/tab2`} component={Tab2} />
            <Route path={`${parentRoute}/tab2/details`} component={Details} />
            <Route path={`${parentRoute}/account`} component={UserAccount} />
            {/* <Redirect exact from={`${parentRoute}`} to={`${parentRoute}/home`}  /> */}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href={`${parentRoute}/home`}>
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href={`${parentRoute}/tab2`}>
              <IonIcon icon={apps} />
              <IonLabel>Tab Two</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href={`${parentRoute}/account`}>
              <IonIcon icon={person} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>);
  }
}