import dotenv from 'dotenv';

dotenv.config();

const envVars = process.env;
const config = { ...envVars };

// const {
//     NODE_ENV,
//     PORT,
//     HOST,
//     BCRYPT_PW,
//     SALT_ROUNDS,
//     SECRET_KEY,
//     DB_NAME,
//     DB_TEST,
//     DB_USER,
//     DB_PW,
//     DB_PORT
// } = config;

export default config;