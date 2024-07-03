import log from "./_log.js";
import { compileAndSaveCss } from "./_compile.js";
import { watch } from "chokidar";
import loc from "./_location.js";

log.info(`Watching ${loc.cssDirInput}...`);
watch(loc.cssDirInput).on("change", (path) => {
	log.info(`Change detected in ${path}.`);
	compileAndSaveCss();
});
