import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { processFile } from '../utils/helpers';
import { preprocessData } from '../utils/preprocess';
import { Box, Center, Heading } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { DistPlot } from '../components/distplot';
import { ScatterPlot } from '../components/scatterplot';

export default function Home({ data, countMap }) {

	return (
		<div className={styles.container}>
			<Head>
				<title>Visualization</title>
			</Head>
			<style jsx global>{`
				.plot-container {
					margin-left: auto;
					margin-right: auto;
				}
			`}</style>
			<main>
				<Box margin='2' padding='2' color='black'>
					{/* <Center><Heading>Data Visualization</Heading></Center> */}
					<Tabs>
						<TabList>
							<Tab>Distribution Plot / Histogram</Tab>
							<Tab>Scatter Plot</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<DistPlot data={data} countMap={countMap} />
							</TabPanel>
							<TabPanel>
								<ScatterPlot data={data} countMap={countMap}/>
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