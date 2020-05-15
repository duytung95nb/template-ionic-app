import { BaseDataService } from "../_core/baseDataService";
import { LoginDto } from "../_dtos/login.dto";
import { authConfig } from "../_core/authConfig";
import { appConstant } from "../_core/appConstant";
import { AxiosResponse } from "axios";

class AuthDataService extends BaseDataService {
    public login(loginDto: LoginDto) {
        return this.post<any>(authConfig.loginUrl, loginDto,);
    }
    public register(loginDto: LoginDto) {
        return this.post<any>(`${appConstant.apiUrl}/register`, loginDto);
    }
}

const authDataService = new AuthDataService();
export default authDataService;