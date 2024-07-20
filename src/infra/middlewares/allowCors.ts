// corsConfig.ts
import cors from 'cors';

const corsOptions: cors.CorsOptions = {
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Permitir todos os métodos
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir esses headers
    credentials: true,
};

export default cors(corsOptions);
