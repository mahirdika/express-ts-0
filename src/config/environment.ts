import 'dotenv/config';

const CONFIG = {
    db: process.env.db,
    JWT_PUBLIC: `${process.env.JWT_PUBLIC}`,
    JWT_PRIVATE: `${process.env.JWT_PRIVATE}`
};

export default CONFIG;