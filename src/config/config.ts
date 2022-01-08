
require('dotenv').config()


const config = {
    mongo: {
        options: {
            wtimeoutMS: 50000,
            maxPoolSize: 50,
            useUnifiedTopology: true,
        },
        url: process.env.MONGO_URL,
    },
    server: {
        host: 'localhost',
        port: process.env.PORT || 1337
    },
    token: {
        login: process.env.LOGIN_TOKEN
    }
}
export default config