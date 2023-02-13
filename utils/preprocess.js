import { COLUMN_MAPPING, COLUMN_TYPE } from "./constants";

export const preprocessData = (rawData) => {
    // console.log(rawData);
    const countMap = Object.fromEntries(Object.entries(COLUMN_MAPPING).map(([key, _]) => [key, {}]));
    const processedData = rawData.map((row) => {
        const processedRow = {}
        Object.entries(row).forEach(([key, val], _) => {
            let updatedVal = val;
            if (COLUMN_MAPPING.hasOwnProperty(key)) {
                switch (COLUMN_MAPPING[key]) {
                    case COLUMN_TYPE.NUMERIC: {
                        if (key == "Release Date") {
                            processedRow[key] = new Date(val).getMonth()+1;
                            updatedVal = new Date(val).getMonth()+1;
                        } else {
                            processedRow[key] = Number(val || 0);
                        }
                        break;
                    }
                    default: processedRow[key] = updatedVal;
                }
                if (!countMap[key].hasOwnProperty(updatedVal)) {
                    countMap[key][updatedVal] = 0;
                }
                countMap[key][updatedVal] += 1;
            }
        });
        return processedRow;
    });
    return { 
        processedData,
        countMap
    };
};
