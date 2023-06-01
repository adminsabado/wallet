import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string;
  @IsNumber()
  id: number;

  @IsNumber()
  mobileNo: number;

  @IsNumber()
  userOTP: number;

  @IsNumber()
  verifyOtpStatus:number;

  @IsString()
  userPAN: string;
  @IsNumber()
  userPanVerifyStatus:number;
  @IsString()
  fullName:string;
  @IsNumber()
  nameVerifiedPanStatus:number;
  @IsString()
  gender:string;
  @IsNumber()
  age:number;
  @IsString()
  address:string;
  @IsString()
  aadhar_voterCard_DL_passport:string;
  @IsString()
  bankAccountNo:string;
  @IsString()
  ifscCode:string;
  @IsString()
  bankName:string;
  @IsString()
  email:string;
  @IsNumber()
  emailOTP:number;
  @IsNumber()
  emailOtpStatus:number;
  @IsString()
  successfulSmsNotificationEmailSendMessage:string;
  @IsNumber()
  smsNotificationEmailSendChargeMoney:number;
}
