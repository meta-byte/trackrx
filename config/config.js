module.exports = {

    development: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: "trackrx_db",
        host: "localhost",
        port: 3306,
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        port: 3306,
        dialect: "mysql"
    },
    production: {
        // username: process.env.DATABASE_USER,
        // password: process.env.DATABASE_PASS,
        // database: process.env.DATABASE,
        // host: process.env.DATABASE_HOST,
        // port: 3306,
        use_env_variable: "JAWS_DB",
        dialect: "mysql"

    }

};