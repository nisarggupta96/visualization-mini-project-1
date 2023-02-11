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
		const maxValueX = COLUMN_MAPPING[columnX].includes(COLUMN_TYPE.NUMERIC) ? d3.max(Object.keys(countMap[columnX]).map((d) => isNaN(d) ? d : Number(d))) : Object.keys(countMap[columnX]).length;;
		const maxValueY = COLUMN_MAPPING[columnY].includes(COLUMN_TYPE.NUMERIC) ? d3.max(Object.keys(countMap[columnY]).map((d) => isNaN(d) ? d : Number(d))) : Object.keys(countMap[columnY]).length;;

		var svg = d3.select("#scatter_plot")
			.append("svg")
				.attr("width", DEFAULT_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", DEFAULT_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
				.append("g")
					.attr("transform",
						`translate(${MARGIN.LEFT},${MARGIN.TOP})`);

		// X axis
		var x, y;
		if (COLUMN_MAPPING[columnX] == COLUMN_TYPE.CATEGORICAL) {
			x = d3.scaleBand()
				.domain(data.map(d => d[columnX]))
				.range([0, 850])
				.padding(1);
		} else {
			x = d3.scaleLinear()
				.domain([0, maxValueX])
				.range([0, DEFAULT_WIDTH]);
		}
		
		svg.append("g")
			.attr("transform", `translate(0, ${850})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");
		
		svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", DEFAULT_WIDTH/2 + columnX.length)
			.attr("y", 900)
			.text(columnX)
			.style("font-size", "18px")
			.style("font-weight", 600);

		// Add Y axis
		if (COLUMN_MAPPING[columnY] == COLUMN_TYPE.CATEGORICAL) {
			y = d3.scaleBand()
				.domain(data.map(d => d[columnY]))
				.range([0, 850])
				.padding(1);
		} else {
			y = d3.scaleLinear()
				.domain([0, maxValueY])
				.range([850, 0]);
		}
		
		svg.append("g")
			.call(d3.axisLeft(y));
		
		svg.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y", -80)
			.attr("x", -DEFAULT_HEIGHT / 1.5 + columnY.length)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.text(columnY)
			.style("font-weight", 600)
			.style("font-size", "18px");

		svg.append('g')
			.selectAll("circle")
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