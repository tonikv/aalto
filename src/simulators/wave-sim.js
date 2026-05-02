import { drawAxes, drawWavePath } from "./canvas-utils.js";
import { derivedWaveValues } from "../physics/wave.js";

export function drawWave(ctx, plot, params, timeSeconds, formatFn) {
  const yMin = -2.2, yMax = 2.2, xMax = 8;
  const v = derivedWaveValues(params);
  drawAxes(ctx, plot, yMin, yMax, 0, xMax, "paikka x (m)", formatFn);
  drawWavePath(ctx, plot, 0, xMax, yMin, yMax,
    x => params.amplitude * Math.sin(v.waveNumber * x - v.angularFrequency * timeSeconds + params.phase),
    { lineWidth: 3.2, strokeStyle: "#d55d3f" }
  );
}
