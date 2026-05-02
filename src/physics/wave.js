export function derivedWaveValues({ amplitude, frequency, wavelength, phase }) {
  const period = 1 / frequency;
  const angularFrequency = 2 * Math.PI * frequency;
  const waveNumber = (2 * Math.PI) / wavelength;
  const speed = frequency * wavelength;
  return { period, angularFrequency, waveNumber, speed };
}
