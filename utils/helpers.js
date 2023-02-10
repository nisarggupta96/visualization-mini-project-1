
import { readFileSync } from "fs";
import path from 'path';
import getConfig from 'next/config';
import * as d3 from 'd3';

const serverPath = (staticFilePath) => path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath);

export const processFile = async (fileName) => {
	const csvData = readFileSync(serverPath(fileName), "utf8");
	const data = d3.csvParse(csvData);
	return data;
};
