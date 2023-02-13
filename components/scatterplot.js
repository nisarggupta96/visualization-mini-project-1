import { Badge, Box, Button, Center, Divider, Heading, HStack, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Radio, RadioGroup, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as d3 from 'd3';
import { COLUMN_MAPPING, COLUMN_TYPE, DEFAULT_COLOR, DISTPLOT_CONFIG, LEGEND_CONFIG } from "../utils/constants";

export const ScatterPlot = ({ data, countMap }) => {
	const [columnX, setColumnX] = useState("");
	const [columnY, setColumnY] = useState("");
	const [axis, selectAxis] = useState("X");
	const [groupByCol, selectGroupByCol] = useState("");
	const [sizeByCol, selectSizeByCol] = useState("");

	const { MARGIN, DEFAULT_HEIGHT, DEFAULT_WIDTH } = DISTPLOT_CONFIG;

	const renderChart = (columnX, columnY) => {
		if (!columnX || !columnY) {
			return;
		}
		const maxValueX = COLUMN_MAPPING[columnX].includes(COLUMN_TYPE.NUMERIC) ? d3.max(Object.keys(countMap[columnX]).map((d) => isNaN(d) ? d : Number(d))) : Object.keys(countMap[columnX]).length;;
		const maxValueY = COLUMN_MAPPING[columnY].includes(COLUMN_TYPE.NUMERIC) ? d3.max(Object.keys(countMap[columnY]).map((d) => isNaN(d) ? d : Number(d))) : Object.keys(countMap[columnY]).length;;

		var Tooltip = d3.select("#scatter_plot")
			.append("div")
			.style("opacity", 0)
			.attr("class", "tooltip")
			.style("background-color", "white")
			.style("position", "absolute")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")

		// Three function that change the tooltip when user hover / move / leave a cell
		var mouseover = function (event) {
			Tooltip
				.style("opacity", 1)
			d3.select(event.target)
				.style("stroke", "black")
				.style("opacity", 1)
		}
		var mousemove = function (event, xVal, yVal, colorVal="", sizeVal="") {
			console.log(xVal, yVal);
			let htmlContent = `<div>
					<b>${columnX}:</b> ${xVal} <br/>
					<b>${columnY}:</b> ${yVal}`;
			if (groupByCol && colorVal) {
				htmlContent += `<br/><b>${groupByCol}:</b> ${colorVal}`;
			}
			if (sizeByCol && sizeVal) {
				htmlContent += `<br/><b>Count by ${sizeByCol}:</b> ${sizeVal}`;
			}
			htmlContent += "</div>";
			Tooltip
				.html(htmlContent)
				.style("left", `${event.offsetX+50}px`)
				.style("top", `${event.offsetY+50}px`)
		}
		var mouseleave = function (event) {
			Tooltip
				.style("opacity", 0)
				.style("left", `-99px`)
				.style("top", `-99px`)
			d3.select(event.target)
				.style("stroke", "none")
				.style("opacity", 0.8)
		}

		var svg = d3.select("#scatter_plot")
			.append("svg")
			.attr("width", DEFAULT_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr("height", DEFAULT_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT*1.5},${MARGIN.TOP})`);

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
				.style("text-anchor", "end")
				.style("font-size", "18px");

		svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", DEFAULT_WIDTH / 2 + columnX.length)
			.attr("y", 1000)
			.text(columnX)
			.style("font-size", "18px")
			.style("font-weight", 600);

		// Add Y axis
		if (COLUMN_MAPPING[columnY] == COLUMN_TYPE.CATEGORICAL) {
			y = d3.scaleBand()
				.domain(data.map(d => d[columnY]))
				.range([850, 0])
				.padding(1);
		} else {
			y = d3.scaleLinear()
				.domain([0, maxValueY])
				.range([850, 0]);
		}

		svg.append("g")
			.call(d3.axisLeft(y))
			.style("font-size", "18px");

		svg.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("x", columnY.length + 100)
			.attr("y", "-2em")
			.text(columnY)
			.style("font-weight", 600)
			.style("font-size", "18px");

		const getColor = groupByCol ? d3.scaleOrdinal()
			.domain(Object.keys(data.map(d => d[groupByCol])))
			.range(d3.schemeSet3) : () => DEFAULT_COLOR;

		const getSize = sizeByCol ? d3.scaleSqrt()
			.range([1, 8])
			.domain([0, d3.max(Object.values(countMap[sizeByCol]))]) : () => 5;

		svg.append('g')
			.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => x(d[columnX]))
				.attr("cy", (d) => y(d[columnY]))
				.attr("r", (d) => sizeByCol ? getSize(countMap[sizeByCol][d[sizeByCol]]) : 5)
				.style("opacity", 0.8)
				.style("fill", (d) => groupByCol ? getColor(d[groupByCol]) : DEFAULT_COLOR)
				.on("mouseover", (e, d) => mouseover(e))
				.on("mousemove", (e, d) => mousemove(e, d[columnX], d[columnY], groupByCol && d[groupByCol], sizeByCol && countMap[sizeByCol][d[sizeByCol]]))
				.on("mouseleave", (e, d) => mouseleave(e))
	};

	useEffect(() => {
		d3.selectAll("#scatter_plot > *").remove();
		renderChart(columnX, columnY);
	}, [columnX, columnY, groupByCol, sizeByCol]);

	return <Box>
		<HStack>
			<RadioGroup name="axis-selection" defaultValue={axis} onChange={(val) => selectAxis(val)}>
				<Radio colorScheme='yellow' size={"lg"} value='X'>X Axis</Radio>
				<Radio colorScheme='green' size={"lg"} value='Y'>Y Axis</Radio>
			</RadioGroup>
			{axis == "X" && (
				<Select variant='outline' defaultValue={columnX} placeholder='Select column X' onChange={(col) => setColumnX(col.target.value)}>
					{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
				</Select>
			)}
			{axis == "Y" && (
				<Select variant='outline' defaultValue={columnY} placeholder='Select column Y' onChange={(col) => setColumnY(col.target.value)}>
					{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
				</Select>
			)}
			<Popover placement='bottom-start'>
				<PopoverTrigger>
					<Button colorScheme={"messenger"} width={"200px"}>Customization</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverHeader fontWeight='semibold'>Attribute to cluster the points :</PopoverHeader>
					<PopoverBody>
						<Select variant='outline' value={groupByCol} onChange={(col) => selectGroupByCol(col.target.value)}>
							<option value={""}>None</option>
							{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
						</Select>
					</PopoverBody>
					<Divider />
					<PopoverHeader fontWeight='semibold'>Attribute to size the points:</PopoverHeader>
					<PopoverBody>
						<Select variant='outline' value={sizeByCol} onChange={(col) => selectSizeByCol(col.target.value)}>
							<option value={""}>None</option>
							{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
						</Select>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</HStack>
		<Box padding={2} className="wrapper">
			{columnX && columnY &&<Center><Heading mt={"10px"} size={"md"}>Scatter plot for: <Text as='samp' color={"red"}>{columnY}</Text> against <Text as='samp' color={"red"}>{columnX}</Text></Heading></Center>}
			<div id="scatter_plot" />
			{columnX && columnY && (
				<div className="legend-container">
					<Popover placement="bottom-start">
						<PopoverTrigger>
							<Button colorScheme={"messenger"}>Legend</Button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader fontWeight='semibold'>{columnX}</PopoverHeader>
							<PopoverBody>
								<Badge variant='subtle' colorScheme={COLUMN_MAPPING[columnX] == COLUMN_TYPE.CATEGORICAL ? 'green' : 'purple'}>
									{COLUMN_MAPPING[columnX] == COLUMN_TYPE.CATEGORICAL ? 'Categorical' : 'Numeric'}
								</Badge>
								<div>
									<b>Detail:</b> {LEGEND_CONFIG[columnX]?.INFO}
								</div>
								{LEGEND_CONFIG[columnX]?.UNIT && <div><b>Unit:</b> {LEGEND_CONFIG[columnX]?.UNIT}</div>}
								{LEGEND_CONFIG[columnX]?.TABLE?.map((data, ind) => <div key={ind}><b>{data.key}</b>: {data.val}</div>)}
							</PopoverBody>
							<PopoverHeader fontWeight='semibold'>{columnY}</PopoverHeader>
							<PopoverBody>
								<Badge variant='subtle' colorScheme={COLUMN_MAPPING[columnY] == COLUMN_TYPE.CATEGORICAL ? 'green' : 'purple'}>
									{COLUMN_MAPPING[columnY] == COLUMN_TYPE.CATEGORICAL ? 'Categorical' : 'Numeric'}
								</Badge>
								<div>
									<b>Detail:</b> {LEGEND_CONFIG[columnY]?.INFO}
								</div>
								{LEGEND_CONFIG[columnY]?.UNIT && <div><b>Unit:</b> {LEGEND_CONFIG[columnY]?.UNIT}</div>}
								{LEGEND_CONFIG[columnY]?.TABLE?.map((data, ind) => <div key={ind}><b>{data.key}</b>: {data.val}</div>)}
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</div>
			)}
		</Box>
	</Box>
};