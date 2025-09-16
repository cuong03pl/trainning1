export function getOverlaps(tempA, workspaceItems) {
  return workspaceItems.filter((item) => {
    if (item?.id === tempA?.id) return false;
    const overlapX = Math.max(
      0,
      Math.min(tempA.x + tempA.width, item.x + (item.width || 50)) -
        Math.max(tempA.x, item.x)
    );
    const overlapY = Math.max(
      0,
      Math.min(tempA.y + tempA.height, item.y + (item.height || 50)) -
        Math.max(tempA.y, item.y)
    );
    const overlapArea = overlapX * overlapY;
    const dragArea = tempA.width * tempA.height;
    const itemArea = (item.width || 50) * (item.height || 50);
    const minArea = Math.min(dragArea, itemArea);
    const requiredOverlap = minArea * 0.25;
    return overlapArea >= requiredOverlap;
  });
}
