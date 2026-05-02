const H = 6.626e-34;
const C = 2.998e8;
const EV = 1.602e-19;

export function photonEnergyJ(frequencyHz) {
  return H * frequencyHz;
}

export function photonEnergyEv(frequencyHz) {
  return photonEnergyJ(frequencyHz) / EV;
}

export function frequencyFromWavelength(lambdaMeters) {
  return C / lambdaMeters;
}

export function regionOfSpectrum(lambdaNm) {
  if (lambdaNm < 0.01) return "gamma";
  if (lambdaNm < 10) return "röntgen";
  if (lambdaNm < 380) return "UV";
  if (lambdaNm < 780) return "näkyvä";
  if (lambdaNm < 1e6) return "IR";
  if (lambdaNm < 1e9) return "mikroaalto";
  return "radio";
}
