export const COLUMN_TYPE = {
    CATEGORICAL: 'CATEGORICAL',
    NUMERIC: 'NUMERIC',
    NUMERIC_II: 'NUMERIC_II'
};

export const COLUMN_MAPPING = {
    'Eng Displ': COLUMN_TYPE.NUMERIC,
    '# Cyl': COLUMN_TYPE.NUMERIC_II,
    'Transmission': COLUMN_TYPE.CATEGORICAL,
    'City FE (Guide) - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Hwy FE (Guide) - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Air Aspiration Method': COLUMN_TYPE.CATEGORICAL,
    'Trans': COLUMN_TYPE.CATEGORICAL,
    '# Gears': COLUMN_TYPE.NUMERIC_II,
    'Drive': COLUMN_TYPE.CATEGORICAL,
    'Annual Fuel Cost - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Intake Valves Per Cyl': COLUMN_TYPE.NUMERIC_II,
    'Exhaust Valves Per Cyl': COLUMN_TYPE.NUMERIC_II,
    'Carline Class': COLUMN_TYPE.CATEGORICAL,
    'Release Date': COLUMN_TYPE.NUMERIC,
    'Stop/Start System (Engine Management System)': COLUMN_TYPE.CATEGORICAL,
    'City CO2 Rounded Adjusted': COLUMN_TYPE.NUMERIC,
    'Hwy CO2 Rounded Adjusted': COLUMN_TYPE.NUMERIC
};

export const DISTPLOT_CONFIG = {
    MARGIN: {
        LEFT: 200,
        RIGHT: 200,
        TOP: 100,
        BOTTOM: 700
    },
    DEFAULT_WIDTH: 850,
    DEFAULT_HEIGHT: 450,
};

export const HIST_CONFIG = {
    'Eng Displ': {
        min_val: 0,
        max_val: 8
    },
    'City FE (Guide) - Conventional Fuel': {
        min_val: 0,
        max_val: 60
    },
    'Hwy FE (Guide) - Conventional Fuel': {
        min_val: 0,
        max_val: 60
    },
    'Annual Fuel Cost - Conventional Fuel': {
        min_val: 0,
        max_val: 6000
    },
    'City CO2 Rounded Adjusted': {
        min_val: 0,
        max_val: 1300
    },
    'Hwy CO2 Rounded Adjusted': {
        min_val: 0,
        max_val: 900
    },
    'Release Date': {
        min_val: 1,
        max_val: 12
    },
};

export const LEGEND_CONFIG = {
    'Eng Displ': {
        INFO: 'Engine Volume',
        UNIT: 'Liters'
    },
    '# Cyl': {
        INFO: "Number of cylinders",
    },
    'Transmission': {
        INFO: "Type of transmission",
        TABLE: [
            { key: 'A', val: 'Automatic Tranmission' },
            { key: 'A', val: 'Automatic Tranmission' },
            { key: 'A-S', val: 'Automatic Transmission-Select Shift' },
            { key: 'AM', val: 'Automated Manual' },
            { key: 'AM-S', val: 'Automated Manual-Selectable' },
            { key: 'AV', val: 'Continuously Variable Transmission' },
            { key: 'AV-S', val: 'Continuously Variable Transmission with Select Shift' },
            { key: 'S', val: 'Supercharger' }
        ]
    },
    'City FE (Guide) - Conventional Fuel': {
        INFO: "Fuel economy estimate in City Test Procedure",
        UNIT: "MPG"
    },
    'Hwy FE (Guide) - Conventional Fuel': {
        INFO: "Fuel economy estimate in Highway Test Procedure",
        UNIT: "MPG"
    },
    'Air Aspiration Method': {
        INFO: "Engine Air Aspiration",
    },
    'Trans': {
        INFO: "Tranmission Type"
    },
    '# Gears': {
        INFO: "Number of gears in the tranmission",
    },
    'Drive': {
        INFO: "Type of driving system",
    },
    'Annual Fuel Cost - Conventional Fuel': {
        INFO: "Estimated annual fuel cost assuming 15,000 miles of travel (55% city and 45% highway)",
        UNIT: '$'
    },
    'Intake Valves Per Cyl': {
        INFO: "Number of intake valves per cylinder",
    },
    'Exhaust Valves Per Cyl': {
        INFO: "Number of exhasut valves per cylinder",
    },
    'Carline Class': {
        INFO: "Vehicle Class",
        TABLE: [
            { key: '2WD', val: 'Two-Wheel Drive' },
            { key: '4WD', val: 'Four-Wheel Drive' },
            { key: 'AWD', val: 'All-Wheel Drive' }
        ]
    },
    'Release Date': {
        INFO: "Month released (2023)",
        TABLE: [
            { key: '1', val: 'January' },
            { key: '2', val: 'February' },
            { key: '3', val: 'March' },
            { key: '4', val: 'April' },
            { key: '5', val: 'May' },
            { key: '6', val: 'June' },
            { key: '7', val: 'July' },
            { key: '8', val: 'August' },
            { key: '9', val: 'September' },
            { key: '10', val: 'October' },
            { key: '11', val: 'November' },
            { key: '12', val: 'December' },
        ]
    },
    'Stop/Start System (Engine Management System)': {
        INFO: "Existence of Engine Start/Stop system",
    },
    'City CO2 Rounded Adjusted': {
        INFO: "CO2 emission in City Test Procedure",
        UNIT: 'Tons'
    },
    'Hwy CO2 Rounded Adjusted': {
        INFO: "CO2 emission in Highway Test Procedure",
        UNIT: 'Tons'
    },
};

export const DEFAULT_COLOR = "#006AFF";