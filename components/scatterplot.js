import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as d3 from 'd3';
import { COLUMN_MAPPING, COLUMN_TYPE, DISTPLOT_CONFIG } from "../utils/constants";

export const ScatterPlot = ({ data, countMap }) => {
	const [columnX, setColumnX] = useState("");
	const [columnY, setColumnY] = useState("");

	const { MARGIN, DEFAULT_HEIGHT, DEFAULT_WIDTH } = DISTPLOT_CONFIG;

	const renderChart = (columnX, columnY) => {
		if (!columnX || !columnY) {
			return;
		}
		const maxValueX = COLUMN_MAPPING[columnX] == COLUMN_TYPE.NUMERIC ? Math.max(...data.map(row => row[columnX])) : Object.keys(countMap[columnX]).length;
		const maxValueY = COLUMN_MAPPING[columnY] == COLUMN_TYPE.NUMERIC ? Math.max(...data.map(row => row[columnY])) : Object.keys(countMap[columnY]).length;

		var svg = d3.select("#scatter_plot")
			.append("svg")
			.attr("width", DEFAULT_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr("height", DEFAULT_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
			.attr("transform",
				`translate(${MARGIN.LEFT},${MARGIN.TOP})`);

		// X axis
		var x = d3.scaleLinear()
			.domain([0, maxValueX])
			.range([0, 800]);
		svg.append("g")
			.attr("transform", `translate(0, ${800})`)
			.call(d3.axisBottom(x));

		// Add Y axis
		var y = d3.scaleLinear()
			.domain([0, maxValueY])
			.range([800, 0]);
		svg.append("g")
			.call(d3.axisLeft(y));

		svg.append('g')
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function (d) { return x(d[columnX]); })
			.attr("cy", function (d) { return y(d[columnY]); })
			.attr("r", 5)
			.style("fill", "#69b3a2")
	};

	useEffect(() => {
		d3.selectAll("#scatter_plot > *").remove();
		renderChart(columnX, columnY);
	}, [columnX, columnY]);

	return <Box>
		<SimpleGrid columns={2} spacing={10}>
			<Select variant='filled' placeholder='Select column X' onChange={(col) => setColumnX(col.target.value)}>
				{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
			</Select>
			<Select variant='filled' placeholder='Select column Y' onChange={(col) => setColumnY(col.target.value)}>
				{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
			</Select>
		</SimpleGrid>
		<Box padding={2}>
			<div id="scatter_plot" />
		</Box>
	</Box>
};