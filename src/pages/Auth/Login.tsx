import {
  IonContent, IonPage, useIonViewDidEnter, useIonViewDidLeave,
  useIonViewWillEnter, useIonViewWillLeave, IonIcon, IonToast
} from '@ionic/react';
import React, { useState } from 'react';
import authService from '../../services/authService';
import userDataService from './userDataService';
import { User } from '../../_models/userModel';
import { Button, TextField } from '@material-ui/core';
import { logIn } from 'ionicons/icons';
import { LoginDto } from '../../_dtos/login.dto';
import './Login.scss';
import { useHistory } from 'react-router';

const Login: React.FC = (props, context) => {
  const [token, setToken] = useState('token');
  const [error, setErrorToken] = useState('errorToken');
  const [currentUser, setCurrentUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loginDto, setLoginDto] = useState<LoginDto>(new LoginDto());
  const history = useHistory();

  let errorToast = {
    show: false,
    message: ''
  }
  useIonViewDidEnter(() => {
    console.log('useIonViewWillEnter');
  });

  useIonViewDidLeave(() => {
    console.log('useIonViewWillEnter');
  });

  useIonViewWillEnter(() => {
    console.log('useIonViewWillEnter');
    setLoading(true);
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      setToken(resultToken);
      userDataService.getUserInfo()
        .then((userDataResult) => {
          setCurrentUser(userDataResult.data);
          setLoading(false);
          // Navigate to application page container
          history.push('/in-app');
        })
        .catch(err => {
          console.log(err);
        });
    }, (err) => {
      setErrorToken(err);
    });
  });

  useIonViewWillLeave(() => {
    console.log('useIonViewWillLeave');
  });

  const onLoginButtonClick = () => {
    authService.login(loginDto);
  }

  const onUsernameChange = (e) => {
    setLoginDto({
      ...loginDto,
      username: e.target.value
    });
  }

  const onPasswordChange = (e) => {
    setLoginDto({
      ...loginDto,
      password: e.target.value
    });
  }

  const onRegisterButtonClick = () => {
    history.push('/register');
  }
  const showErrorToastFunction = (isShow: boolean) => {
    if (isShow) {
      return;
    }
    errorToast = {
      show: false,
      message: ''
    };
  };

  return (
    <IonPage className="login-page">
      <IonContent className="ion-padding">
        <div className="login-page__content">
          <form className="form__content" noValidate autoComplete="off">
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Username"
                variant="outlined"
                value={loginDto.username}
                onChange={onUsernameChange} />
            </div>
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Password"
                variant="outlined"
                value={loginDto.password}
                onChange={onPasswordChange} />
            </div>
            <Button color="primary"
              variant="contained"
              onClick={onLoginButtonClick}
              startIcon={<IonIcon icon={logIn} />}>
              Login
          </Button>
          </form>

          <Button color="secondary"
            variant="text"
            onClick={onRegisterButtonClick}
            startIcon={<IonIcon icon={logIn} />}>
            Register
          </Button>
        </div>
        <IonToast
          isOpen={errorToast.show}
          onDidDismiss={() => showErrorToastFunction(false)}
          message={errorToast.message}
          duration={200}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
