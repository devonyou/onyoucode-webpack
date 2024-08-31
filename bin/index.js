#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

(async function () {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'app_name',
			message: 'What is your app name?',
		},
	]);

	const app_name = answers.app_name;

	if (!app_name.length) {
		throw new Error(`The app name is empty`);
	}

	// Step 2: Define the source directory (mock) and destination directory
	const source_dir = path.join(__dirname, '..', 'sources');
	const dest_dir = path.join(process.cwd(), app_name);

	console.log(dest_dir);

	if (fs.existsSync(dest_dir)) {
		throw new Error(`${chalk.red(`Cannot create ${app_name}. It already exists.`)}`);
	}

	function copyFiles(src, dest) {
		const entries = fs.readdirSync(src, { withFileTypes: true });

		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest, { recursive: true });
		}

		for (const entry of entries) {
			const src_path = path.join(src, entry.name);
			const dest_path = path.join(dest, entry.name);

			if (entry.isDirectory()) {
				copyFiles(src_path, dest_path);
			} else {
				let content = fs.readFileSync(src_path, 'utf8');
				content = content.replace(/\$\{APP_NAME\}/g, app_name);
				fs.writeFileSync(dest_path, content);
			}
		}
	}

	copyFiles(source_dir, dest_dir);

	console.log(`Project '${chalk.green(`${dest_dir}`)}' created successfully!`);
})();
