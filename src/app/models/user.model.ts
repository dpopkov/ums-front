import { Role } from "./role.enum";

export class User {
    id: number | undefined;
    username: string = '';
    password: string = '';
    name: string = '';
    accessToken: string = '';
    refreshTokenId: string = '';
    role: Role = Role.USER;
}
