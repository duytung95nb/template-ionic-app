import environment from '../_config/environment';

export class AuthConfig {
    public clientId?: string;
    public returnUrl?: string;
    public loginUrl?: string;
    public issuer?: string;
    public scope?: string;
    public responseType?: string;
    public storage?: Storage;
    public origin?: string;
}
export const authConfig: AuthConfig = {
    clientId: 'template_app',
    origin: window.location.origin,
    returnUrl: window.location.origin,
    // loginUrl: 'http://localhost:8081/authService/login',
    // issuer: 'http://localhost:8081',
    loginUrl: `${environment.IDP_ORIGIN}/api/login`,
    issuer: environment.IDP_ORIGIN,
    scope: 'profile email',
    responseType: 'token',
    storage: sessionStorage
} 