export function mapX(value, min, max, plot) {
  return plot.left + ((value - min) / (max - min)) * plot.width;
}

export function mapY(value, min, max, plot) {
  return plot.top + ((max - value) / (max - min)) * plot.height;
}

export function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
}

export function getPlot(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const compact = width < 420;
  return {
    left: compact ? 46 : 58,
    top: 20,
    width: Math.max(120, width - (compact ? 62 : 86)),
    height: Math.max(140, height - (compact ? 66 : 58)),
    canvasWidth: width,
    canvasHeight: height,
  };
}

export function drawAxes(ctx, plot, yMin, yMax, xMin, xMax, xLabel, formatFn) {
  ctx.save();
  ctx.strokeStyle = "rgba(23, 48, 71, 0.12)";
  ctx.fillStyle = "rgba(88, 109, 128, 0.92)";
  ctx.lineWidth = 1;
  ctx.font = "13px Georgia";
  const xTicks = 8;
  const yTicks = 4;
  for (let i = 0; i <= xTicks; i++) {
    const t = i / xTicks;
    const x = plot.left + plot.width * t;
    ctx.beginPath();
    ctx.moveTo(x, plot.top);
    ctx.lineTo(x, plot.top + plot.height);
    ctx.stroke();
    ctx.fillText(formatFn(xMin + (xMax - xMin) * t, 1), x - 10, plot.top + plot.height + 22);
  }
  for (let i = 0; i <= yTicks; i++) {
    const t = i / yTicks;
    const y = plot.top + plot.height * t;
    ctx.beginPath();
    ctx.moveTo(plot.left, y);
    ctx.lineTo(plot.left + plot.width, y);
    ctx.stroke();
    ctx.fillText(formatFn(yMax - (yMax - yMin) * t, 1), plot.left - 42, y + 4);
  }
  const equilibriumY = mapY(0, yMin, yMax, plot);
  ctx.strokeStyle = "rgba(14, 130, 150, 0.4)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(plot.left, equilibriumY);
  ctx.lineTo(plot.left + plot.width, equilibriumY);
  ctx.stroke();
  ctx.fillStyle = "rgba(23, 48, 71, 0.95)";
  ctx.fillText(xLabel, plot.left + plot.width - ctx.measureText(xLabel).width - 4, plot.top - 6);
  ctx.save();
  ctx.translate(18, plot.top + plot.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("poikkeama y (m)", 0, 0);
  ctx.restore();
  ctx.restore();
}

export function drawWavePath(ctx, plot, xMin, xMax, yMin, yMax, sampler, style) {
  ctx.save();
  ctx.beginPath();
  for (let px = 0; px <= plot.width; px++) {
    const xValue = xMin + (px / plot.width) * (xMax - xMin);
    const canvasX = plot.left + px;
    const canvasY = mapY(sampler(xValue), yMin, yMax, plot);
    px === 0 ? ctx.moveTo(canvasX, canvasY) : ctx.lineTo(canvasX, canvasY);
  }
  ctx.lineWidth = style.lineWidth;
  ctx.strokeStyle = style.strokeStyle;
  if (style.dash) ctx.setLineDash(style.dash);
  ctx.stroke();
  ctx.restore();
}
