import winston, { format } from "winston";
import { __prod__, __test__ } from "../constants";

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const customFormatter = format.printf(({ level, message, timestamp }): string => {
    return `[${timestamp}] => ${level}: ${message}`;
})

export const logger = winston.createLogger({
    levels: logLevels,
    transports: [
        new winston.transports.File({ filename: './logs/warnings.log' }),
        new winston.transports.File({ level: "error", filename: './logs/errors.log' })
    ],
    format: format.combine(
        format.timestamp({
            format: 'DD-MM-YYYY T hh:mm:ss.sss A'
        }),
        customFormatter
    )
})

if (!__prod__ && !__test__) {
    logger.add(new winston.transports.Console({
        format: format.combine(
            format.colorize(),
            format.timestamp({
                format: 'DD-MM-YYYY T hh:mm:ss.sss A'
            }),
            customFormatter,
        ),
    }));
}