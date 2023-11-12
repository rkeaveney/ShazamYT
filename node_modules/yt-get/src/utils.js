const fs = require("fs");

// Replaces invalid filename characters
function sanitizeFilename(filename) {
	const invalidCharsRegex = /[<>:"\/\\|?*\x00-\x1F]/g;
	const replacementChar = "_";
	return filename.replace(invalidCharsRegex, replacementChar);
}

function createOutputFolder(folderName) {
	try {
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName, { recursive: true });
		}
	} catch (error) {
		throw new Error("Failed to create output folder");
	}
}

// Lib Exports
module.exports = {
	sanitizeFilename,
	createOutputFolder,
};
