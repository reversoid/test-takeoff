export interface LoginUserDto {
    login: string;
    password: string;
}
export interface CreateUserDTO extends LoginUserDto {
    name: string;
}
