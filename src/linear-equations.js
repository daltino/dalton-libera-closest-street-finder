const calculateLineCoefficents = (p1, p2) => {
  // Using the formula for line equation to get Ax + Bx + C = 0
  const a = p1[1] - p2[1];
  const b = p2[0] - p1[0];
  const c = (p1[0] - p2[0]) * p1[1] + (p2[1] - p1[1]) * p1[0];
  return { a, b, c };
};

const calculateSlope = (p1, p2) => {
  // Using the slope formula m = (y2 - y1) / (x2 - x1);
  return (p2[1] - p1[1]) / (p2[0] - p1[0]);
};

const distanceFromPoint = function (a, b, c, p) {
  // Using perpendicular distance formula 
  // d = ABS(a * x0 + b * y0 + c) / SQRT(a ^ (2 + b) ^ 2);
  return Math.abs(((a * p[0]) + (b * p[1]) + c)) / Math.sqrt((a ^ 2) + (b ^ 2));
};

const calculateClosestStreets = (point, streets) => {
  const streetsByDistance = {};
  if (streets.length > 0) {
    streets.forEach(street => {
      // Get the straight line coefficients for this street
      const { a, b, c } = calculateLineCoefficents(street.start, street.end);
      // Get the distance from point
      const distance = distanceFromPoint(a, b, c, JSON.parse(point));
      // Need to investigate isNaN numbers
      if(!isNaN(distance) && isFinite(distance)) {
        // Store in streetsByDistance object
        streetsByDistance[street.name] = JSON.stringify(distance);
      }
    });

    if (Object.keys(streetsByDistance).length > 0) {
      // Sort streets based on their distance
      // Some folks might want to use Lodash here!
      return Object.entries(streetsByDistance)
        .sort((s1, s2) => (s1[1] <= s2[1] ? -1 : 1))
        .reduce((sortedStreets, streetPair) => {
          sortedStreets[streetPair[0]] = streetPair[1];
          return sortedStreets;
        }, {});  
    }
  }

  return null;
};

export default {
  calculateLineCoefficents,
  calculateSlope,
  distanceFromPoint,
  calculateClosestStreets,
};
