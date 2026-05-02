import { mirrorImageDistance, magnification } from "../physics/mirror.js";

export function drawMirror(ctx, plot, params, _timeSeconds, _formatFn) {
  const a = params.objectDistance;
  const f = params.focalLength || 10;
  const scale = plot.width / 60;
  const cx = plot.left + plot.width * 0.5;
  const cy = plot.top + plot.height / 2;

  ctx.strokeStyle = "rgba(88,109,128,0.4)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(plot.left, cy);
  ctx.lineTo(plot.left + plot.width, cy);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#173047";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 60);
  ctx.lineTo(cx, cy + 60);
  ctx.stroke();

  ctx.fillStyle = "rgba(213,93,63,0.7)";
  ctx.strokeStyle = "#d55d3f";
  ctx.lineWidth = 2;
  const objX = cx - a * scale;
  ctx.beginPath();
  ctx.moveTo(objX, cy);
  ctx.lineTo(objX, cy - 28);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(objX, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(14,130,150,0.2)";
  ctx.beginPath();
  ctx.arc(cx - f * scale, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  const b = mirrorImageDistance(f, a);
  if (b !== null) {
    const M = magnification(a, b);
    const imgX = cx - b * scale;
    const imgH = Math.abs(M) * 28;
    const imgDir = M < 0 ? -1 : 1;

    if (b > 0) {
      ctx.strokeStyle = "#0e8296";
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = "#0e8296";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
    }
    ctx.beginPath();
    ctx.moveTo(imgX, cy);
    ctx.lineTo(imgX, cy - imgDir * imgH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(14,130,150,0.7)";
    ctx.beginPath();
    ctx.arc(imgX, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(23,48,71,0.85)";
    ctx.font = "13px Georgia";
    ctx.fillText(`a = ${a} cm`, plot.left + 6, plot.top + 20);
    ctx.fillText(`b = ${b.toFixed(1)} cm`, plot.left + 6, plot.top + 38);
    ctx.fillText(`M = ${M.toFixed(2)}`, plot.left + 6, plot.top + 56);
    ctx.fillText(`f = ${f} cm`, plot.left + 6, plot.top + 74);
  }
}
