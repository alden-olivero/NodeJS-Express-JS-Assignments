const winston=require('winston');

const urlShortenerLogger=winston.createLogger({
    transports:[
        new winston.transports.File({
            filename:'urlShortener.log',
            level:'info',
            format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename:'urlShortenerError.log',
            level:'error',
            format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

module.exports =urlShortenerLogger;
