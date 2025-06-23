module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/etoad',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    server: {
        port: process.env.PORT || 3000,
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default_development_secret',
        expiresIn: '7d'
    }
}; 