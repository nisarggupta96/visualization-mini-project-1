export const COLUMN_TYPE = {
    CATEGORICAL: 'CATEGORICAL',
    NUMERIC: 'NUMERIC',
    DATE: 'DATE'
};

export const COLUMN_MAPPING = {
    // 'Carline': COLUMN_TYPE.CATEGORICAL,
    'Eng Displ': COLUMN_TYPE.NUMERIC,
    '# Cyl': COLUMN_TYPE.CATEGORICAL,
    'Transmission': COLUMN_TYPE.CATEGORICAL,
    'City FE (Guide) - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Hwy FE (Guide) - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Air Aspiration Method Desc': COLUMN_TYPE.CATEGORICAL,
    'Trans Desc': COLUMN_TYPE.CATEGORICAL,
    '# Gears': COLUMN_TYPE.CATEGORICAL,
    'Drive Desc': COLUMN_TYPE.CATEGORICAL,
    'Annual Fuel Cost - Conventional Fuel': COLUMN_TYPE.NUMERIC,
    'Intake Valves Per Cyl': COLUMN_TYPE.CATEGORICAL,
    'Exhaust Valves Per Cyl': COLUMN_TYPE.CATEGORICAL,
    'Carline Class Desc': COLUMN_TYPE.CATEGORICAL,
    'Release Date': COLUMN_TYPE.DATE,
    'Stop/Start System (Engine Management System)  Description': COLUMN_TYPE.CATEGORICAL,
    'City CO2 Rounded Adjusted': COLUMN_TYPE.NUMERIC,
    'Hwy CO2 Rounded Adjusted': COLUMN_TYPE.NUMERIC
};

export const DISTPLOT_CONFIG = {
    MARGIN: {
        LEFT: 100,
        RIGHT: 100,
        TOP: 100,
        BOTTOM: 500
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
