export declare class loginDto {
    email: string;
    password: string;
}
export declare class AuthDto extends loginDto {
    cnic: string;
    fullName: string;
    phone: string;
    dob: Date;
    cnicPhoto: string;
}
