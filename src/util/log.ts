import chalk from "chalk";
import moment from 'moment';

export default class Logger {
    static info(...args) {
        console.log(chalk.yellow(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }

    static success(...args) {
        console.log(chalk.green(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }

    static error(...args) {
        console.log(chalk.red(`[${moment().format('YYYY-MM-DD')}] [${moment().format('HH:mm:ss')}] `), ...args);
    }
}

// const logger = new Logger();

// export { logger };