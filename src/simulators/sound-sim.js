import { drawAxes, drawWavePath } from "./canvas-utils.js";

export function drawSound(ctx, plot, params, _timeSeconds, formatFn) {
  const yMin = -1, yMax = 1, xMax = 10;
  drawAxes(ctx, plot, yMin, yMax, 0, xMax, "aika t (ms)", formatFn);
  const fMs = params.frequency / 1000;
  drawWavePath(ctx, plot, 0, xMax, yMin, yMax,
    t => params.amplitude * Math.sin(2 * Math.PI * fMs * t),
    { lineWidth: 2.2, strokeStyle: "#0e8296" }
  );
}
