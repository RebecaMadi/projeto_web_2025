import { cleanEnv, port, str } from 'envalid';
const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        LOGS_PATH: str({
            default: 'logs'        
        }),
        DATABASE_URL: str({
            desc: 'Database connection string'
        }),
    });
};
export default validateEnv;