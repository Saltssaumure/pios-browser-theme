import chalk from "chalk";

export default {
	info: (message: string) => {
		console.log(chalk.blue(message));
	},
	success: (message: string) => {
		console.log(chalk.green(message));
	},
	warn: (message: string) => {
		console.log(chalk.yellow(message));
	},
	error: (message: string) => {
		console.log(chalk.red(message));
	}
};
