
import bcrypt from 'bcrypt';

class PasswordManager {
    constructor() {
        this.saltRounds = 10;
    }

    async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            return hashedPassword;
        } catch (error) {
            console.log(error);
            throw new Error('Error hashing password');
        }
    }

    async comparePassword(password, hashedPassword) {
        try {
            const result = await bcrypt.compare(password, hashedPassword);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error('Error comparing passwords');
        }
    }
}

export default new PasswordManager();
