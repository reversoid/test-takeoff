import axios from "axios";
import { CreateUserDTO, LoginUserDto } from "./types";

export class AuthService {
    public registration(user: CreateUserDTO) {
        return axios.post<string>('http://localhost:4444/api/auth/registration', user);
    }

    public login(user: LoginUserDto) {
        return axios.post<string>('http://localhost:4444/api/auth/login', user);
    }
}