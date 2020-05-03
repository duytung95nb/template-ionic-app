import { IonContent, IonHeader, IonPage, useIonViewDidEnter, useIonViewDidLeave,
  useIonViewWillEnter, useIonViewWillLeave, IonIcon, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import authService from '../services/authService';
import userDataService from './userDataService';
import { User } from '../_models/userModel';
import CargodyHeader from '../_shared/CargodyHeader';
import CargodyProgressBar from '../_shared/CargodyProgressBar';
import { Button, TextField, Container } from '@material-ui/core';
import { logIn } from 'ionicons/icons';
import { LoginDto } from '../_dtos/login.dto';

const Login: React.FC = (props, context) => {
  const [token, setToken] = useState('token');
  const [error, setErrorToken] = useState('errorToken');
  const [currentUser, setCurrentUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loginDto, setLoginDto] = useState<LoginDto>(new LoginDto());

  let errorToast = {
    show: false,
    message: ''
  }
  useIonViewDidEnter(() => {
    console.log('Home ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('Home ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    setLoading(true);
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      setToken(resultToken);
      userDataService.getUserInfo()
        .then((userDataResult) => {
          setCurrentUser(userDataResult.data);
          setLoading(false);
          // Navigate to application page container
          context.history.push('/in-app');
        })
        .catch(err => {
          console.log(err);
        });
    }, (err) => {
      setErrorToken(err);
    });
  });

  useIonViewWillLeave(() => {
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
    // TODO: need to implement register later and remove this
    let mockUser = new LoginDto();
    mockUser.username = 'tungdao95nb2';
    mockUser.password = 'tungdao95nb';
    authService.register(mockUser)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
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
    <IonPage>
      <CargodyProgressBar loading={loading}/>
      <IonHeader>
        <CargodyHeader>
          Login
        </CargodyHeader>
      </IonHeader>
      <IonContent className="ion-padding">
      <Container maxWidth="sm">
          <form className="form__content" noValidate autoComplete="off">
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Username"
                variant="outlined"
                value={loginDto.username || ''}
                onChange={onUsernameChange} />
            </div>
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Password"
                variant="outlined"
                value={loginDto.password || ''}
                onChange={onPasswordChange} />
            </div>
          <Button color="primary"
            variant="text"
            onClick={onLoginButtonClick}
            startIcon={<IonIcon icon={logIn}/>}>
            Login
          </Button>
          </form>
          
          <Button color="secondary"
            variant="text"
            onClick={onRegisterButtonClick}
            startIcon={<IonIcon icon={logIn}/>}>
            Register
          </Button>
        </Container>
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
