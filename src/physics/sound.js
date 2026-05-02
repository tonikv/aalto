export function speedOfSound(tempCelsius = 20) {
  return 331.3 * Math.sqrt(1 + tempCelsius / 273.15);
}

export function wavelengthInAir(frequencyHz, tempCelsius = 20) {
  return speedOfSound(tempCelsius) / frequencyHz;
}
