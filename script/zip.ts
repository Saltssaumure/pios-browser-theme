import fs from "fs";
import log from "./_log.js";
import loc from "./_location.js";
import path from "path";
import archiver from "archiver";

const zip = (dirInput: string, pathOutput: string) => {
	const output = fs.createWriteStream(pathOutput);
	const archive = archiver("zip", {
		zlib: { level: 9 }
	});

	output.on("close", () => {
		log.success(`Zipped to ${pathOutput} (${archive.pointer()} total bytes)`);
	});

	archive.on("error", (err) => {
		throw err;
	});

	archive.on("warning", (err) => {
		if (err.code === "ENOENT") {
			log.warn(err.message);
		} else {
			throw err;
		}
	});

	archive.directory(dirInput, false);

	archive.pipe(output);
	archive.finalize();
};

if (!fs.existsSync(loc.allDirOutput)) fs.mkdirSync(loc.allDirOutput, { recursive: true });

loc.themeBrowsers.forEach((browser) => {
	log.info(`Zipping ${browser} theme...`);

	const themeDirInput = path.join(loc.themeDirInput, browser);
	const themePathOutput = path.join(loc.allDirOutput, `pios-${browser}-theme.zip`);

	fs.copyFileSync("./LICENSE", path.join(themeDirInput, "LICENSE"));
	zip(themeDirInput, themePathOutput);
});
