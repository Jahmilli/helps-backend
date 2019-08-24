import * as dotenv from 'dotenv';

class AppConfig {
    public readonly gmailEmail: string;
    public readonly gmailPassword: string;

    constructor() {
        dotenv.config();
        this.gmailEmail = process.env.GMAIL_EMAIL as string;
        this.gmailPassword = process.env.GMAIL_PASSWORD as string;
    }
}

export default new AppConfig;