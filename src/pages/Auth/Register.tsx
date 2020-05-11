import {
    IonContent, IonPage, useIonViewDidEnter, useIonViewDidLeave,
    useIonViewWillEnter, useIonViewWillLeave, IonIcon, IonToast, IonAlert
} from '@ionic/react';
import React, { useState, useRef } from 'react';
import authService from '../../services/authService';
import { Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { logIn, backspace } from 'ionicons/icons';
import { RegisterDto } from '../../_dtos/login.dto';
import './Register.scss';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

const Register: React.FC = (props, context) => {
    const [errorRegister, setErrorRegister] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [registerDto, setRegisterDto] = useState<RegisterDto>(new RegisterDto());
    const history = useHistory();
    let errorToast = {
        show: false,
        message: ''
    };
    const { handleSubmit, register, errors, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    useIonViewDidEnter(() => {
    });

    useIonViewDidLeave(() => {
    });

    useIonViewWillEnter(() => {
    });

    useIonViewWillLeave(() => {
    });

    const onUsernameChange = (e) => {
        setRegisterDto({
            ...registerDto,
            username: e.target.value
        });
    }

    const onPasswordChange = (e) => {
        setRegisterDto({
            ...registerDto,
            password: e.target.value
        });
    }

    const onPasswordConfirmedChange = (e) => {
        setRegisterDto({
            ...registerDto,
            passwordConfirmed: e.target.value
        });
    }
    const onRegisterButtonClick = () => {
        setLoading(true);
        authService.register(registerDto)
            .then(loggedInResult => {
                setErrorRegister('');
                setLoading(false);
                context.history.push('/');
            })
            .catch(error => {
                setLoading(false);
                if (error.status >= 400 && error.status < 500) {
                    setErrorRegister(error.data);
                    return;
                }
                setErrorRegister('');
                // show toast
            });
    }
    const onGoBackToLoginClick = () => {
        history.push('/login');
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
                <div className="register-page__content">
                    <form className="form__content" noValidate autoComplete="off">
                        {errorRegister.length ?
                            <Alert severity="error"
                                className="register-page__error-message">{errorRegister}</Alert>
                            : ''}
                        <div className="form__text-field-container">
                            <TextField className="form__text-field" label="Username"
                                variant="outlined"
                                name="username"
                                value={registerDto.username}
                                onChange={onUsernameChange}
                                inputRef={register({
                                    minLength: {
                                        value: 8,
                                        message: "Username should not be less than 8 chars"
                                    }
                                })} />
                            {errors.username ?
                                <div className="form__inline-error">
                                    {errors.username.message}
                                </div>
                                : ''
                            }
                        </div>
                        <div className="form__text-field-container">
                            <TextField className="form__text-field"
                                name="password"
                                label="Password" variant="outlined"
                                value={registerDto.password || ''}
                                onChange={onPasswordChange}
                                />
                            {errors.password ?
                                <div className="form__inline-error">
                                    {errors.password.message}
                                </div>
                                : ''
                            }
                        </div>
                        <div className="form__text-field-container">
                            <TextField className="form__text-field"
                                name="passwordConfirmed"
                                label="Password confirmed" variant="outlined"
                                value={registerDto.passwordConfirmed || ''}
                                onChange={onPasswordConfirmedChange}
                                inputRef={register({
                                    required: "Required",
                                    validate: value => value === password.current
                                        || "Password does not match"
                                })}/>
                            {errors.passwordConfirmed ?
                                <div className="form__inline-error">
                                    {errors.passwordConfirmed.message}
                                </div>
                                : ''
                            }
                        </div>
                        <Button color="primary"
                            variant="contained"
                            onClick={handleSubmit(onRegisterButtonClick)}
                            startIcon={<IonIcon icon={logIn} />}>
                            Register
                        </Button>
                        <Button color="secondary"
                            variant="text"
                            onClick={onGoBackToLoginClick}
                            startIcon={<IonIcon icon={backspace} />}>
                            Go back to login
                        </Button>
                    </form>
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

export default Register;
