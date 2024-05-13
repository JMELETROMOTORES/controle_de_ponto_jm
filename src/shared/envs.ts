import * as dotenv from "dotenv";

dotenv.config();

export const envs = {
    salt: Number(process.env.SALT),
    jwtSalt: String(process.env.JWT_SALT),
    nodeEnv: String(process.env.NODE_ENV),
    publicFilesUrl: String(process.env.PUBLIC_FILES_URL),
    publicStaticLocalFilesUrl: String(process.env.PUBLIC_STATIC_LOCAL_FILES_URL),
    emailSender: String(process.env.EMAIL_SENDER),
};
