"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        console.log("create user service apis" + typeof createUserDto.mobileNo);
        var userOTP = 111111;
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
    async getUsers() {
        return await this.userRepository.find();
    }
    async getUser(userId) {
        return await this.userRepository.findOne({
            where: { id: userId },
        });
    }
    async editUser(userId, createUserDto) {
        const editedUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!editedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const result = await this.userRepository.update({ id: userId }, createUserDto);
        console.log(result);
        return editedUser;
    }
    async deleteUser(userId) {
        await this.userRepository.delete(userId);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map