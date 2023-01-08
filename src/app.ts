import superagent from "superagent";
import fs from "fs";
import { URL } from "url";

class WebPageArchiver {
	websitesToVisit: Array<string> = []
	isMetadataMode: boolean = false;
	constructor() {
		// console.log("process.argv", process.argv);
		if(process.argv.length > 2) {
			this.isMetadataMode = process.argv[2] === '--metadata';
			if(this.isMetadataMode) {
				// Assumption is metadata can also have multiple websites in options
				this.websitesToVisit = process.argv.slice(3);
				this.getMetadata();
			} else {
				this.websitesToVisit = process.argv.slice(2);
				this.getWebsiteHTMLs();
			}
		} else { 
			console.log(`Please provide a website to cache`);
		}
	}
	async getMetadata() {
		for(let website of this.websitesToVisit) {
			let urlObject = new URL(website);
			let fileName = `${urlObject.host}.html`;
			if(fs.existsSync(fileName)) {
				try {
					let fileContent = fs.readFileSync(fileName, "utf-8");
					let fileStat = fs.statSync(fileName);
					if(fileContent) {
						let imagesCount = (fileContent.match(/<img\s/g) || []).length;
						let linksCount = (fileContent.match(/<a\s/g) || []).length;
						console.log(`site: ${urlObject.host}`);
						console.log(`num_links: ${linksCount}`);
						console.log(`images: ${imagesCount}`);
						console.log(`last_fetch: ${new Date(fileStat.atime).toUTCString()}`);
						console.log(``);
					} else {
						console.log(`File ${fileName} is empty`); 
					}
				} catch(err) {
					console.log(`Error while reading file ${fileName}. Error is ${err.message}`);
				}
			} else {
				console.log(`File ${fileName} does not exist`);
			}
		}
	}
	getWebsiteHTMLs() {
		for(let website of this.websitesToVisit) {
			this.getWebsiteDataAndSave(website);
		}
	}
	async getWebsiteDataAndSave(url: string) {
		let urlObject = new URL(url);
		let fileName = `${urlObject.host}.html`;
		try { 
			let resp = await superagent.get(url);
			if(resp.text && resp.type === "text/html") {
				fs.writeFileSync(fileName, resp.text);
				console.log(`Done writing file ${fileName} for domain ${urlObject.host}`);
			}
		} catch(err) {
			console.log(`Error while reading website ${urlObject.host}. Error is ${err.message}`);
		}
	}
}

new WebPageArchiver();