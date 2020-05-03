import {BehaviorSubject } from 'rxjs';
import { authConfig, AuthConfig } from "../_core/authConfig";
import authDataService from './authDataService';
import { LoginDto } from '../_dtos/login.dto';
declare var window: any;

class AuthService {
    private storage: Storage;
    private accessTokenSubject = new BehaviorSubject<string | null>(null);
    private accessTokenStorageKey = 'access_token';
    public getAccessTokenSubscription() {
        return this.accessTokenSubject;
    }
    constructor() {
        this.configure(authConfig);
    }

    configure(config: AuthConfig) {
        this.storage = config.storage !== undefined ? config.storage: sessionStorage;
    }

    login(loginDto: LoginDto) {
        try {
            const savedAccessToken = this.getFromStore(this.accessTokenStorageKey);
            if(!savedAccessToken) {
                this.initateLoginFlow(loginDto)
                .then((loggedInResult) => {
                    this.store(this.accessTokenStorageKey,
                        loggedInResult[this.accessTokenStorageKey]);
                    this.accessTokenSubject.next(loggedInResult[this.accessTokenStorageKey]);
                })
                .catch((error) => {
                    this.accessTokenSubject.next(error);
                });
            }
            else {
                this.accessTokenSubject.next(savedAccessToken);
            }
        }
        catch(err) {
            this.accessTokenSubject.error(err);
        }
        
    }

    register(loginDto: LoginDto) {
        return authDataService.register(loginDto);
    }

    public initateLoginFlow(loginDto: LoginDto): Promise<any> {
        return new Promise((resolve, reject) => {
            authDataService.login(loginDto)
                .then((accessToken) => {
                    resolve(accessToken);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    getFragmentParams(fullUrl) {
        /** @type {?} */
        let queryString = fullUrl;
        queryString = decodeURIComponent(queryString);
        if (queryString.indexOf('#') >= 0) {
            return {};
        }
        /** @type {?} */
        const questionMarkPosition = queryString.indexOf('?');
        if (questionMarkPosition > -1) {
            queryString = queryString.substr(questionMarkPosition + 1);
        }
        else {
            queryString = queryString.substr(1);
        }
        return this.parseQueryString(queryString);
    }

    parseQueryString(queryString: string): Object {
        /** @type {?} */
        const data = {};
        /** @type {?} */
        let pairs;
        /** @type {?} */
        let pair;
        /** @type {?} */
        let separatorIndex;
        /** @type {?} */
        let escapedKey;
        /** @type {?} */
        let escapedValue;
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        if (queryString === null) {
            return data;
        }
        pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf('=');
            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            }
            else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }
            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);
            if (key.substr(0, 1) === '/') {
                key = key.substr(1);
            }
            data[key] = value;
        }
        return data;
    }

    store(key, value) {
        // maybe need to switch to local storage
        this.storage.setItem(key, value);
    }

    getFromStore(key) {
        return this.storage.getItem(key);
    }

    logout() {
        // TODO: need to implement clear session on server later
        this.storage.removeItem(this.accessTokenStorageKey);
        this.accessTokenSubject.next(null);
    }
}

const authService = new AuthService();
export default authService;