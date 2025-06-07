import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { createUniqueId } from "@/utils/id";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { stringToNumber } from "@/utils/conversion";

export function calculateDifference(
    mostRecentItem: MeterDataWithObjectId,
    secondMostRecentItem: MeterDataWithObjectId,
    thirdMostRecentItem: MeterDataWithObjectId
) {
    const {
        light: lightFromThirdMostRecent,
        lightDay: lightDayFromThirdMostRecent,
        lightNight: lightNightFromThirdMostRecent,
        gas: gasFromThirdMostRecent,
        water: waterFromThirdMostRecent,
    } = getValuesFromThirdMostRecent(thirdMostRecentItem);

    return [
        {
            id: mostRecentItem._id,
            title: titlesForMeterReadings.date,
            description: formatDate(mostRecentItem.date),
            percentDifference: 0,
        },
        {
            id: createUniqueId(),
            title: titlesForMeterReadings.light,
            description: (mostRecentItem.light - secondMostRecentItem.light).toFixed(2),
            percentDifference: calculatePercentDifference(
                mostRecentItem.light - secondMostRecentItem.light,
                secondMostRecentItem.light - lightFromThirdMostRecent
            ),
        },
        {
            id: createUniqueId(),
            title: titlesForMeterReadings.lightDay,
            description: (mostRecentItem.lightDay - secondMostRecentItem.lightDay).toFixed(2),
            percentDifference: calculatePercentDifference(
                mostRecentItem.lightDay - secondMostRecentItem.lightDay,
                secondMostRecentItem.lightDay - lightDayFromThirdMostRecent
            ),
        },
        {
            id: createUniqueId(),
            title: titlesForMeterReadings.lightNight,
            description: (mostRecentItem.lightNight - secondMostRecentItem.lightNight).toFixed(2),
            percentDifference: calculatePercentDifference(
                mostRecentItem.lightNight - secondMostRecentItem.lightNight,
                secondMostRecentItem.lightNight - lightNightFromThirdMostRecent
            ),
        },
        {
            id: createUniqueId(),
            title: titlesForMeterReadings.gas,
            description: (mostRecentItem.gas - secondMostRecentItem.gas).toFixed(2),
            percentDifference: calculatePercentDifference(
                mostRecentItem.gas - secondMostRecentItem.gas,
                secondMostRecentItem.gas - gasFromThirdMostRecent
            ),
        },
        {
            id: createUniqueId(),
            title: titlesForMeterReadings.water,
            description: ((mostRecentItem.water || 0) - (secondMostRecentItem.water || 0)).toFixed(2),
            percentDifference: calculatePercentDifference(
                (mostRecentItem.water || 0) - (secondMostRecentItem.water || 0),
                (secondMostRecentItem.water || 0) - waterFromThirdMostRecent
            ),
        },
    ];
}

function getValuesFromThirdMostRecent(thirdMostRecentItem?: MeterDataWithObjectId) {
    return {
        light: thirdMostRecentItem ? thirdMostRecentItem.light : 0,
        lightDay: thirdMostRecentItem ? thirdMostRecentItem.lightDay : 0,
        lightNight: thirdMostRecentItem ? thirdMostRecentItem.lightNight : 0,
        gas: thirdMostRecentItem ? thirdMostRecentItem.gas : 0,
        water: thirdMostRecentItem ? thirdMostRecentItem.water || 0 : 0,
    };
}

function calculatePercentDifference(newValue: number, oldValue: number) {
    if (oldValue === 0) return 0;

    const maxValuePercent = 100;
    const difference = newValue - oldValue;
    const percentDifference = (difference / oldValue) * 100;
    const boundedPercentDifference = Math.max(-maxValuePercent, Math.min(percentDifference, maxValuePercent));

    return stringToNumber(boundedPercentDifference.toFixed(1));
}
