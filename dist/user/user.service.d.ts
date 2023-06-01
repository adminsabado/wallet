import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDTO): Promise<User>;
    getUsers(): Promise<User[]>;
    getUser(userId: number): Promise<User>;
    editUser(userId: number, createUserDto: CreateUserDTO): Promise<User>;
    deleteUser(userId: number): Promise<void>;
}
