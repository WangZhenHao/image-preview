
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function getDistance(start, stop) {
    return Math.hypot(stop.x - start.x, stop.y - start.y);
};
export {
    range,
    getDistance
}