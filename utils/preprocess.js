import { COLUMN_MAPPING, COLUMN_TYPE } from "./constants";

export const preprocessData = (rawData) => {
    // console.log(rawData);
    const countMap = Object.fromEntries(Object.entries(COLUMN_MAPPING).map(([key, _]) => [key, {}]));
    const processedData = rawData.map((row) => {
        const processedRow = {}
        Object.entries(row).forEach(([key, val], _) => {
            if (COLUMN_MAPPING.hasOwnProperty(key)) {
                switch (COLUMN_MAPPING[key]) {
                    case COLUMN_TYPE.NUMERIC: {
                        processedRow[key] = Number(val || 0);
                        break;
                    }
                    case COLUMN_TYPE.DATE: {
                        processedRow[key] = new Date(val).getMonth()+1;
                        break;
                    }
                    default: processedRow[key] = val;
                }
                if (!countMap[key].hasOwnProperty(val)) {
                    countMap[key][val] = 0;
                }
                countMap[key][val] += 1;
            }
        });
        return processedRow;
    });
    return { 
        processedData,
        countMap
    };
};
