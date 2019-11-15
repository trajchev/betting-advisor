// The user Model
export interface User {
    id?: Number;
    username: String;
    email: String;
    photo?: String;
    role?: String;
    password: String;
    passwordConfirm?: boolean;
    passwordResetToken?: String;
    passwordResetExpire?: String;
    createdAt: Date;
    updatedAt: Date;
    firstName?: String;
    lastName?: String;
    dateAdded: Date;
}
