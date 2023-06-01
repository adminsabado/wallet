import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    console.log("create user service apis"+typeof createUserDto.mobileNo);
    var userOTP:number = 111111;
    createUserDto.userOTP = userOTP;
    createUserDto.verifyOtpStatus = 0;
    createUserDto.userPAN = "";
    createUserDto.userPanVerifyStatus = 0;
    createUserDto.fullName = "";
    createUserDto.nameVerifiedPanStatus = 0;
    createUserDto.gender = "";
    createUserDto.age = null;
    createUserDto.address = "";
    createUserDto.aadhar_voterCard_DL_passport = "";
    createUserDto.bankAccountNo = "";
    createUserDto.ifscCode = "";
    createUserDto.bankName = "";
    createUserDto.email = "";
    createUserDto.emailOTP = null;
    createUserDto.emailOtpStatus = 0;
    createUserDto.successfulSmsNotificationEmailSendMessage = "";
    createUserDto.smsNotificationEmailSendChargeMoney = null;

    return await this.userRepository.save(createUserDto);
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  public async editUser(
    userId: number,
    createUserDto: CreateUserDTO,
  ): Promise<User> {
    const editedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    const result = await this.userRepository.update(
      { id: userId },
      createUserDto,
    );
    console.log(result);
    return editedUser;
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
