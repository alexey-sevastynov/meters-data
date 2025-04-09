export function updateLocalStorageValues(
    currentPage: string,
    light: string,
    lightDay: string,
    lightNight: string,
    gas: string,
    water?: string
) {
    localStorage.setItem(`metersData_light_${currentPage}`, light);
    localStorage.setItem(`metersData_lightDay_${currentPage}`, lightDay);
    localStorage.setItem(`metersData_lightNight_${currentPage}`, lightNight);
    localStorage.setItem(`metersData_gas_${currentPage}`, gas);
    localStorage.setItem(`metersData_water_${currentPage}`, water || "");
}
