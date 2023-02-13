import Head from 'next/head';
import { processFile } from '../utils/helpers';
import { preprocessData } from '../utils/preprocess';
import { Box, Center, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react';
import { DistPlot } from '../components/distplot';
import { ScatterPlot } from '../components/scatterplot';

export default function Home({ data, countMap }) {

	return (
		<div>
			<Head>
				<title>Visualization</title>
			</Head>
			<style jsx global>{`
				* {
					font-family: "Inter";
				}
				.plot-container {
					margin-left: auto;
					margin-right: auto;
				}
				.wrapper {
					position: relative;
				}
				.legend-container {
					position: absolute;
					right: 10px;
					top: 25px;
				}
			`}</style>
			<main>
				<Box margin='2' color='black'>
					<Tabs isFitted variant="enclosed-colored">
						<TabList>
							<Box width={"20%"}><Heading size={"lg"}>Data Visualization</Heading></Box>
							<Tab>Distribution Plot / Histogram</Tab>
							<Tab>Scatter Plot</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<DistPlot data={data} countMap={countMap} />
							</TabPanel>
							<TabPanel>
								<ScatterPlot data={data} countMap={countMap} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</main>
		</div>
	)
};

export async function getStaticProps() {
	const data = await processFile('/data/cars2023.csv');
	const { processedData, countMap } = preprocessData(data);
	return {
		props: {
			data: processedData,
			countMap: countMap
		},
	}
};