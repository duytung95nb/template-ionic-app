import { BaseDataService } from "../_core/baseDataService";
import { LoginDto } from "../_dtos/login.dto";
import { authConfig } from "../_core/authConfig";
import { appConstant } from "../_core/appConstant";

class AuthDataService extends BaseDataService {
    public login(loginDto: LoginDto) {
        return this.post(authConfig.loginUrl, loginDto);
    }
    public register(loginDto: LoginDto) {
        return this.post(`${appConstant.apiUrl}/register`, loginDto);
    }
}

const authDataService = new AuthDataService();
export default authDataService;