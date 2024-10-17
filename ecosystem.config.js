module.exports = {
  apps: [
    {
      name: 'app',
      script: './server.js',
      env: {
        DATABASE_URL: 'mysql://jmdb:2rIlWvYSuEESUCKa8m4E@jm-db-1.cjuwwe2actua.us-east-1.rds.amazonaws.com:3306/point_system_v2',
        JWT_SECRET: 'secret',
        // outras variáveis de ambiente...
      },
    },
  ],
};
