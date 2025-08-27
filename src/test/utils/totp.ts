import * as OTPAuth from 'otpauth';
import * as dotenv from "dotenv";
dotenv.config();

export function generateOtp(): string {
    const totp = new OTPAuth.TOTP({
        issuer: 'Heroku',
        label: 'myTOTP',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: process.env.SECRET_2FA
    });
    
    return totp.generate();
}
