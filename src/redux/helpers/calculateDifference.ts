import { titlesForMeterReadings } from "@/constants/titlesForMeterReadings";
import { calculatePercentDifference } from "@/helpers/calculatePercentDifference";
import { formatDate } from "@/helpers/formatDate";
import { MeterDataType } from "@/types/MeterDataType";
import { v4 } from "uuid";

function getValuesFromThirdMostRecent(thirdMostRecentItem?: MeterDataType) {
  return {
    light: thirdMostRecentItem ? thirdMostRecentItem.light : 0,
    lightDay: thirdMostRecentItem ? thirdMostRecentItem.lightDay : 0,
    lightNight: thirdMostRecentItem ? thirdMostRecentItem.lightNight : 0,
    gas: thirdMostRecentItem ? thirdMostRecentItem.gas : 0,
    water: thirdMostRecentItem ? thirdMostRecentItem.water || 0 : 0,
  };
}

export function calculateDifference(
  mostRecentItem: MeterDataType,
  secondMostRecentItem: MeterDataType,
  thirdMostRecentItem: MeterDataType
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
      id: v4(),
      title: titlesForMeterReadings.date,
      description: formatDate(mostRecentItem.date),
      percentDifference: 0,
    },
    {
      id: v4(),
      title: titlesForMeterReadings.light,
      description: (mostRecentItem.light - secondMostRecentItem.light).toFixed(
        2
      ),
      percentDifference: calculatePercentDifference(
        mostRecentItem.light - secondMostRecentItem.light,
        secondMostRecentItem.light - lightFromThirdMostRecent
      ),
    },
    {
      id: v4(),
      title: titlesForMeterReadings.lightDay,
      description: (
        mostRecentItem.lightDay - secondMostRecentItem.lightDay
      ).toFixed(2),
      percentDifference: calculatePercentDifference(
        mostRecentItem.lightDay - secondMostRecentItem.lightDay,
        secondMostRecentItem.lightDay - lightDayFromThirdMostRecent
      ),
    },
    {
      id: v4(),
      title: titlesForMeterReadings.lightNight,
      description: (
        mostRecentItem.lightNight - secondMostRecentItem.lightNight
      ).toFixed(2),
      percentDifference: calculatePercentDifference(
        mostRecentItem.lightNight - secondMostRecentItem.lightNight,
        secondMostRecentItem.lightNight - lightNightFromThirdMostRecent
      ),
    },
    {
      id: v4(),
      title: titlesForMeterReadings.gas,
      description: (mostRecentItem.gas - secondMostRecentItem.gas).toFixed(2),
      percentDifference: calculatePercentDifference(
        mostRecentItem.gas - secondMostRecentItem.gas,
        secondMostRecentItem.gas - gasFromThirdMostRecent
      ),
    },
    {
      id: v4(),
      title: titlesForMeterReadings.water,
      description: (
        (mostRecentItem.water || 0) - (secondMostRecentItem.water || 0)
      ).toFixed(2),
      percentDifference: calculatePercentDifference(
        (mostRecentItem.water || 0) - (secondMostRecentItem.water || 0),
        (secondMostRecentItem.water || 0) - waterFromThirdMostRecent
      ),
    },
  ];
}
