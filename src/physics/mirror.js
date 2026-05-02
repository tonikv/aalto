export function mirrorImageDistance(focalLength, objectDistance) {
  const inv = 1 / focalLength - 1 / objectDistance;
  if (inv === 0) return null;
  return 1 / inv;
}

export function magnification(objectDistance, imageDistance) {
  return -imageDistance / objectDistance;
}
