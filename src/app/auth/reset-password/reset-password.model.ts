import { User } from 'src/app/user-area/user/profile.model';

// Forgot password response model
export interface ResetPasswordResponse {
    status: String;
    token: String;
    expiresIn: Number;
    data: {
        user: User;
    };
}
