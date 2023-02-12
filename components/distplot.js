import {
	Box,
	Select,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	VStack,
	Switch,
	HStack,
	FormControl,
	FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as d3 from 'd3';
import { COLUMN_MAPPING, COLUMN_TYPE, DISTPLOT_CONFIG, HIST_CONFIG } from "../utils/constants";

export const DistPlot = ({ data, countMap }) => {
	const [columnToShow, setColumnToShow] = useState("");
	const [numOfBins, setNumOfBins] = useState(10);
	const [isHorizontal, setIsHorizontal] = useState(false);

	const { MARGIN, DEFAULT_HEIGHT, DEFAULT_WIDTH } = DISTPLOT_CONFIG;

	const renderHistogram = (svg, selectedColumn) => {
		const dataToRender = data;
		const { min_val, max_val } = HIST_CONFIG[selectedColumn];

		if (isHorizontal) {
			const y = d3.scaleLinear()
				.range([DEFAULT_HEIGHT, 0])
				.domain([min_val, max_val])  // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })

			svg.append("g")
				.call(d3.axisLeft(y))
				.selectAll("text")
				.style("text-anchor", "end")
				.style("font-size", "18px");

			// set the parameters for the histogram
			const histogram = d3.histogram()
				.value((d) => d[selectedColumn])   // I need to give the vector of value
				.domain(y.domain())  // then the domain of the graphic
				.thresholds(y.ticks(numOfBins)); // then the numbers of bins

			// And apply this function to data to get the bins
			const bins = histogram(dataToRender);
			// X axis: scale and draw:
			const x = d3.scaleLinear()
				.range([DEFAULT_WIDTH, 0])
				.domain([d3.max(bins, (d) => d.length) + 50, 0]);   // d3.hist has to be called before the Y axis obviously

			svg.append("g")
				.attr("transform", "translate(0," + DEFAULT_HEIGHT + ")")
				.call(d3.axisBottom(x))
				.selectAll("text")
				.style("font-size", "18px");

			svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", DEFAULT_WIDTH / 2 - columnToShow.length)
				.attr("y", DEFAULT_HEIGHT + 100)
				.text("Frequency")
				.style("font-size", "18px")
				.style("font-weight", 600);

			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("x", "50")
				.attr("y", "-2em")
				.text(selectedColumn)
				.style("font-weight", 600)
				.style("font-size", "18px");

			// append the bar rectangles to the svg element
			svg.selectAll("rect")
				.data(bins)
				.enter()
				.append("rect")
				.attr("x", 0.5)
				.attr("y", (d) => y(d.x1) + 2)
				.attr("transform", (d) => `translate(2em, ${x(d.x0)})`)
				.style("fill", "#69b3a2")
				.style("border", "1px solid black")
				.transition()
				.duration(500)
				.attr("height", (d) => y(d.x0) - y(d.x1) - 5)
				.attr("width", (d) => x(d.length));

		} else {
			const x = d3.scaleLinear()
				.domain([min_val, max_val])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
				.range([0, 850]);

			svg.append("g")
				.attr("transform", "translate(0," + DEFAULT_HEIGHT + ")")
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(10,0) rotate(-45)")
				.style("text-anchor", "end")
				.style("font-size", "18px");

			// set the parameters for the histogram
			const histogram = d3.histogram()
				.value((d) => d[selectedColumn])   // I need to give the vector of value
				.domain(x.domain())  // then the domain of the graphic
				.thresholds(x.ticks(numOfBins)); // then the numbers of bins

			// And apply this function to data to get the bins
			const bins = histogram(dataToRender);
			// Y axis: scale and draw:
			const y = d3.scaleLinear()
				.range([DEFAULT_HEIGHT, 0]);

			y.domain([0, d3.max(bins, (d) => d.length) + 50]);   // d3.hist has to be called before the Y axis obviously
			svg.append("g")
				.call(d3.axisLeft(y))
				.selectAll("text")
				.style("font-size", "18px");

			svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", DEFAULT_WIDTH / 2 - columnToShow.length)
				.attr("y", DEFAULT_HEIGHT + 100)
				.text(selectedColumn)
				.style("font-size", "18px")
				.style("font-weight", 600);

			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y", -80)
				.attr("x", -DEFAULT_HEIGHT / 2.5)
				.attr("dy", ".75em")
				.attr("transform", "rotate(-90)")
				.text("Frequency")
				.style("font-weight", 600)
				.style("font-size", "18px");

			// append the bar rectangles to the svg element
			svg.selectAll("rect")
				.data(bins)
				.enter()
				.append("rect")
				.attr("x", 1)
				.attr("transform", (d) => "translate(" + x(d.x0) + "," + y(d.length) + ")")
				.attr("width", 0)
				.style("fill", "#69b3a2")
				.transition()
				.duration(500)
				.attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
				.attr("height", (d) => DEFAULT_HEIGHT - y(d.length));
		}
	};

	const renderDistribution = (svg, selectedColumn) => {
		const dataToRender = Object.entries(countMap[selectedColumn]);
		const maxValue = Math.max(...Object.values(countMap[selectedColumn]));
		if (isHorizontal) {
			var x = d3.scaleLinear()
				.domain([0, maxValue])
				.range([0, DEFAULT_WIDTH]);
			svg.append("g")
				.attr("transform", "translate(0," + DEFAULT_HEIGHT + ")")
				.call(d3.axisBottom(x))
				.style("font-size", "18px")
				.selectAll("text")
				.attr("transform", "translate(10,0)")
				.style("text-anchor", "end");

			svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", DEFAULT_WIDTH / 2 - columnToShow.length)
				.attr("y", DEFAULT_HEIGHT + 100)
				.text("Frequency")
				.style("font-size", "18px")
				.style("font-weight", 600);

			// Y axis
			var y = d3.scaleBand()
				.range([0, DEFAULT_HEIGHT])
				.domain(dataToRender.map((d) => d[0]))
				.padding(.1);
			svg.append("g")
				.call(d3.axisLeft(y))
				.style("font-size", "18px");

			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("x", "50")
				.attr("y", "-2em")
				.text(selectedColumn)
				.style("font-weight", 600)
				.style("font-size", "18px");

			//Bars
			svg.selectAll("mybar")
				.data(dataToRender)
				.enter()
				.append("rect")
				.attr("x", x(0))
				.attr("y", (d) => y(d[0]))
				.attr("width", 0)
				.transition()
				.duration(500)
				.attr("width", (d) => x(d[1]))
				.attr("height", y.bandwidth())
				.attr("fill", "#69b3a2")
		} else {
			const x = d3.scaleBand()
				.range([0, 850])
				.domain(dataToRender.map((d) => d[0]))
				.padding(0.2);

			svg.append("g")
				.attr("transform", "translate(0," + DEFAULT_HEIGHT + ")")
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0) rotate(-45)")
				.style("text-anchor", "end")
				.style("font-size", "18px");

			let defaultOffset = 150;
			if (["Carline Class Desc"].includes(columnToShow)) {
				defaultOffset = 300;
			}
			svg.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", DEFAULT_WIDTH)
				.attr("transform", `translate(-${DEFAULT_WIDTH / 4 - columnToShow.length * 2})`)
				.attr("y", DEFAULT_HEIGHT + defaultOffset)
				.text(selectedColumn)
				.style("font-size", "18px")
				.style("font-weight", 600);

			// Add Y axis
			const y = d3.scaleLinear()
				.domain([0, maxValue])
				.range([DEFAULT_HEIGHT, 0]);

			svg.append("g")
				.call(d3.axisLeft(y))
				.style("font-size", "18px");

			svg.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y", -80)
				.attr("x", -DEFAULT_HEIGHT / 2.5)
				.attr("dy", ".75em")
				.attr("transform", "rotate(-90)")
				.text("Frequency")
				.style("font-weight", 600)
				.style("font-size", "18px");

			// Bars
			svg.selectAll("mybar")
				.data(dataToRender)
				.enter()
				.append("rect")
				.attr("x", (d) => x(d[0]))
				.attr("y", (d) => y(d[1]))
				.attr("width", 0)
				.attr("fill", "#69b3a2")
				.transition()
				.duration(500)
				.attr("width", x.bandwidth())
				.attr("height", (d) => DEFAULT_HEIGHT - y(d[1]))
		}
	};

	const renderChart = (selectedColumn) => {
		if (!selectedColumn) {
			return;
		}

		let leftMargin = MARGIN.LEFT;
		if (isHorizontal && ["Carline Class Desc", "Air Aspiration Method Desc"].includes(columnToShow)) {
			leftMargin = 400;
		}

		const svg = d3.select("#dist_plot")
			.append("svg")
			.attr("width", DEFAULT_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr("height", DEFAULT_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
			.attr("transform", "translate(" + leftMargin + "," + MARGIN.TOP + ")");

		// X axis
		if (COLUMN_MAPPING[selectedColumn] == COLUMN_TYPE.NUMERIC) {
			renderHistogram(svg, selectedColumn);
		} else {
			renderDistribution(svg, selectedColumn);
		}

	}

	useEffect(() => {
		d3.selectAll("#dist_plot > *").remove();
		renderChart(columnToShow);
	}, [columnToShow, numOfBins, isHorizontal]);

	const BinNumberSelector = (<VStack spacing='24px'>
		<Slider aria-label='slider-ex-1' mt={50} defaultValue={10} min={5} max={20} size={'lg'} onChange={(val) => setNumOfBins(val)}>
			<SliderMark
				value={numOfBins}
				textAlign='center'
				bg='blue.500'
				color='white'
				mt='-10'
				ml='-5'
				w='12'
			>
				{numOfBins}
			</SliderMark>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<SliderThumb />
		</Slider>
		<Box>
			Number of bins = {numOfBins}
		</Box>
	</VStack>);

	return <Box>
		<HStack>
			<FormControl display={"flex"} alignItems='center' justifyContent="space-between">
				<Select width={"80%"} id='toggle-col' variant='filled' placeholder='Select column' onChange={(col) => setColumnToShow(col.target.value)}>
					{Object.keys(COLUMN_MAPPING).map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
				</Select>
				<FormLabel marginLeft={"auto"} htmlFor='toggle-axis' mb='0'>
					Toggle Orientation
				</FormLabel>
				<Switch colorScheme='teal' size='lg' id='toggle-axis' value={isHorizontal} onChange={(e) => setIsHorizontal(e.target.checked)} />
			</FormControl>
		</HStack>
		<Box padding={2}>
			{/* {columnToShow && COLUMN_MAPPING[columnToShow] == COLUMN_TYPE.NUMERIC && BinNumberSelector} */}
			<div id="dist_plot" />
		</Box>
	</Box>
};