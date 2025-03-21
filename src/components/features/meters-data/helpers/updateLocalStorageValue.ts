export const updateLocalStorageValues = (
  currentPage: string,
  light: number,
  lightDay: number,
  lightNight: number,
  gas: number,
  water: number | undefined
) => {
  localStorage.setItem(`metersData_light_${currentPage}`, String(light));
  localStorage.setItem(`metersData_lightDay_${currentPage}`, String(lightDay));
  localStorage.setItem(
    `metersData_lightNight_${currentPage}`,
    String(lightNight)
  );
  localStorage.setItem(`metersData_gas_${currentPage}`, String(gas));
  localStorage.setItem(`metersData_water_${currentPage}`, String(water || 0));
};
