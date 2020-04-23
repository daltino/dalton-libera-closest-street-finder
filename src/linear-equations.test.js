import linearEquations from './linear-equations';

describe('Linear Equations Module', () => {
  it('calculates line coefficients correctly', () => {
    const p1 = [2, 1];
    const p2 = [2, 5];
    expect(linearEquations.calculateLineCoefficents(p1, p2)).toEqual({
      a: -4,
      b: 0,
      c: 8,
    });
  });

  it('calculates slope of a line correctly', () => {
    const p1 = [3, 4];
    const p2 = [0, 3];
    expect(linearEquations.calculateSlope(p1, p2)).toEqual(0.3333333333333333);
  });

  it('calculates the distance from point to a line correctly', () => {
    const p = [1, 1];
    const p1 = [3, 4];
    const p2 = [0, 3];
    const linearCoefficients = linearEquations.calculateLineCoefficents(p1, p2);
    expect(
      linearEquations.distanceFromPoint(...Object.values(linearCoefficients), p)
    ).toEqual(4.949747468305833);
  });

  describe('has a function calculateClosestStreets', () => {
    it('that calculates the closest street to a point correctly when a point and streets are given', () => {
      const p = JSON.stringify([1, 1]);
      const streets = [
        {
          name: 'Street 1',
          start: [2, 1],
          end: [2, 5],
        },
        {
          name: 'Street 2',
          start: [2, 2],
          end: [1, 3],
        },
        {
          name: 'Street 3',
          start: [3, 4],
          end: [0, 3],
        },
      ];

      expect(linearEquations.calculateClosestStreets(p, streets)).toEqual({
        'Street 3': '4.949747468305833',
      });
    });

    it('returns null when no street is given', () => {
      const p = JSON.stringify([1, 1]);
      const streets = [];

      expect(linearEquations.calculateClosestStreets(p, streets)).toEqual(null);
    });
  });
});
