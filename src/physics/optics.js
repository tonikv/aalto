export function snellRefraction(n1, n2, theta1Deg) {
  const sinTheta2 = (n1 / n2) * Math.sin((theta1Deg * Math.PI) / 180);
  if (Math.abs(sinTheta2) > 1) return null;
  return (Math.asin(sinTheta2) * 180) / Math.PI;
}

export function criticalAngleDeg(n1, n2) {
  if (n2 >= n1) return null;
  return (Math.asin(n2 / n1) * 180) / Math.PI;
}
