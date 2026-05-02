import { snellRefraction, criticalAngleDeg } from "../physics/optics.js";

export function drawLight(ctx, plot, params, _timeSeconds, _formatFn) {
  const theta1 = params.angle;
  const n1 = params.n1 || 1.0;
  const n2 = params.n2 || 1.5;
  const cx = plot.left + plot.width * 0.5;
  const cy = plot.top + plot.height * 0.5;
  const len = Math.min(plot.width, plot.height) * 0.38;

  ctx.fillStyle = "rgba(14,130,150,0.06)";
  ctx.fillRect(cx, plot.top, plot.width / 2 + plot.left, plot.height);
  ctx.fillStyle = "rgba(213,93,63,0.04)";
  ctx.fillRect(plot.left, plot.top, cx - plot.left, plot.height);

  ctx.save();
  ctx.strokeStyle = "rgba(88,109,128,0.5)";
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - len * 1.1);
  ctx.lineTo(cx, cy + len * 1.1);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  ctx.strokeStyle = "rgba(88,109,128,0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(plot.left, cy);
  ctx.lineTo(plot.left + plot.width, cy);
  ctx.stroke();

  const t1 = (theta1 * Math.PI) / 180;
  ctx.strokeStyle = "#d55d3f";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - len * Math.sin(t1), cy - len * Math.cos(t1));
  ctx.lineTo(cx, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + len * Math.sin(t1), cy - len * Math.cos(t1));
  ctx.stroke();

  const theta2 = snellRefraction(n1, n2, theta1);
  const critical = criticalAngleDeg(n2, n1);

  if (theta2 !== null) {
    const t2 = (theta2 * Math.PI) / 180;
    ctx.strokeStyle = "#0e8296";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + len * Math.sin(t2), cy + len * Math.cos(t2));
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(23,48,71,0.85)";
  ctx.font = "13px Georgia";
  ctx.fillText(`θ₁ = ${theta1}°`, plot.left + 6, plot.top + 22);
  ctx.fillText(`θ₂ = ${theta2 !== null ? theta2.toFixed(1) + "°" : "kokonaisheijastus"}`, plot.left + 6, plot.top + 40);
  if (critical !== null) {
    ctx.fillText(`θ_c = ${critical.toFixed(1)}°`, plot.left + 6, plot.top + 58);
  }
  ctx.fillText(`n₁ = ${n1}`, plot.left + 6, plot.top + plot.height - 30);
  ctx.fillText(`n₂ = ${n2}`, plot.left + 6, plot.top + plot.height - 12);
}
