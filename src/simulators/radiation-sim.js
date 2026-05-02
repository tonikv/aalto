import { frequencyFromWavelength, photonEnergyEv, regionOfSpectrum } from "../physics/radiation.js";

function wavelengthToRgb(nm) {
  let r, g, b;
  if (nm < 380) { r = 0.5; g = 0; b = 0.8; }
  else if (nm < 450) { r = (450 - nm) / 70 * 0.5 + 0.5; g = 0; b = 1; }
  else if (nm < 490) { r = 0; g = (nm - 450) / 40; b = 1; }
  else if (nm < 510) { r = 0; g = 1; b = (510 - nm) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; b = 0; }
  else if (nm < 645) { r = 1; g = (645 - nm) / 65; b = 0; }
  else if (nm < 700) { r = 1; g = 0; b = 0; }
  else { r = 0.8; g = 0; b = 0; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

export function drawRadiation(ctx, plot, params, _timeSeconds, formatFn) {
  const nm = params.wavelength;
  const color = wavelengthToRgb(nm);
  ctx.fillStyle = color;
  ctx.fillRect(plot.left, plot.top, plot.width, plot.height);

  const lambdaM = nm * 1e-9;
  const freq = frequencyFromWavelength(lambdaM);
  const eV = photonEnergyEv(freq);
  const region = regionOfSpectrum(nm);

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.font = "bold 15px Georgia";
  const line1 = `λ = ${nm} nm   (${region})`;
  const line2 = `f ≈ ${(freq / 1e14).toFixed(2)} · 10¹⁴ Hz   E ≈ ${eV.toFixed(2)} eV`;
  ctx.fillText(line1, plot.left + 16, plot.top + 36);
  ctx.fillText(line2, plot.left + 16, plot.top + 60);

  const spectrumY = plot.top + plot.height - 28;
  const spectrumH = 18;
  const grad = ctx.createLinearGradient(plot.left, 0, plot.left + plot.width, 0);
  const stops = [[380,"#8800cc"],[430,"#0000ff"],[490,"#00ffff"],[510,"#00ff00"],[580,"#ffff00"],[645,"#ff0000"],[700,"#800000"]];
  stops.forEach(([l, c]) => grad.addColorStop((l - 380) / 320, c));
  ctx.fillStyle = grad;
  ctx.fillRect(plot.left, spectrumY, plot.width, spectrumH);

  const markerX = plot.left + Math.max(0, Math.min(1, (nm - 380) / 320)) * plot.width;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(markerX - 1.5, spectrumY - 4, 3, spectrumH + 8);
}
