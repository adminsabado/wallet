import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDTO): Promise<User>;
    verifyMobileNoOtpStatusUser(createUserDto: CreateUserDTO): Promise<User>;
    getUsers(): Promise<User[]>;
    getUser(userId: number): Promise<User>;
    editUser(createUserDto: CreateUserDTO, userId: number): Promise<User>;
    deleteUser(userId: number): Promise<void>;
}
