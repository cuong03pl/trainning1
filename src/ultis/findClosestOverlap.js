export function findClosestOverlap(overlap, draggingCenter) {
  return overlap.reduce((closest, current) => {
    const currentCenter = {
      x: current.x + (current.width || 50) / 2,
      y: current.y + (current.height || 50) / 2,
    };
    const closestCenter = {
      x: closest.x + (closest.width || 50) / 2,
      y: closest.y + (closest.height || 50) / 2,
    };
    const currentDistance = Math.sqrt(
      Math.pow(draggingCenter.x - currentCenter.x, 2) +
        Math.pow(draggingCenter.y - currentCenter.y, 2)
    );
    const closestDistance = Math.sqrt(
      Math.pow(draggingCenter.x - closestCenter.x, 2) +
        Math.pow(draggingCenter.y - closestCenter.y, 2)
    );
    return currentDistance < closestDistance ? current : closest;
  });
}
