import * as sass from "sass";
import fs from "fs";
import path from "path";

import log from "./_log.js";
import notice from "./_notice.js";
import loc from "./_location.js";

export const compileAndSaveCss = () => {
	const pathInput = path.join(loc.cssDirInput, loc.cssFileInput);
	const pathOutput = path.join(loc.allDirOutput, loc.cssFileOutput);

	try {
		if (!fs.existsSync(pathInput)) {
			throw new Error(`Can't find ${pathInput}`);
		}

		// Compile css
		const css = sass.compile(pathInput, {
			style: "compressed",
			charset: false,
			loadPaths: ["node_modules"]
		}).css;

		// Save css
		if (!fs.existsSync(loc.allDirOutput)) fs.mkdirSync(loc.allDirOutput, { recursive: true });
		fs.writeFileSync(pathOutput, notice.header + css);

		log.success(`Compiled to ${pathOutput}`);
	} catch (error) {
		log.error(`Error compiling to ${pathOutput}: ${error.message}`);
	}
};
