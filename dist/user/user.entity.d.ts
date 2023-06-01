import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    mobileNo: number;
    userOTP: number;
    verifyOtpStatus: number;
    userPAN: string;
    userPanVerifyStatus: number;
    fullName: string;
    nameVerifiedPanStatus: number;
    gender: string;
    age: number;
    address: string;
    aadhar_voterCard_DL_passport: string;
    bankAccountNo: string;
    ifscCode: string;
    bankName: string;
    email: string;
    emailOTP: number;
    emailOtpStatus: number;
    successfulSmsNotificationEmailSendMessage: string;
    smsNotificationEmailSendChargeMoney: number;
}
