import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobileNo: number;

  @Column()
  userOTP: number;

  @Column()
  verifyOtpStatus:number;

  @Column()
  userPAN: string;
  @Column()
  userPanVerifyStatus:number;
  @Column()
  fullName:string;
  @Column()
  nameVerifiedPanStatus:number;
  @Column()
  gender:string;
  @Column()
  age:number;
  @Column()
  address:string;
  @Column()
  aadhar_voterCard_DL_passport:string;
  @Column()
  bankAccountNo:string;
  @Column()
  ifscCode:string;
  @Column()
  bankName:string;
  @Column()
  email:string;
  @Column()
  emailOTP:number;
  @Column()
  emailOtpStatus:number;
  @Column()
  successfulSmsNotificationEmailSendMessage:string;
  @Column()
  smsNotificationEmailSendChargeMoney:number;



}
