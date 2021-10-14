const weeks = [
  (weekOne = {
    start: Date.parse('2021-09-10T00:00:00.000Z'),
    end: Date.parse('2021-09-14T00:00:00.000Z'),
    number: 1,
  }),
  (weekTwo = {
    start: Date.parse('2021-09-17T00:00:00.000Z'),
    end: Date.parse('2021-09-21T00:00:00.000Z'),
    number: 2,
  }),
  (weekThree = {
    start: Date.parse('2021-09-23T00:00:00.000Z'),
    end: Date.parse('2021-09-28T00:00:00.000Z'),
    number: 3,
  }),
  (weekFour = {
    start: Date.parse('2021-09-30T00:00:00.000Z'),
    end: Date.parse('2021-10-05T00:00:00.000Z'),
    number: 4,
  }),
  (weekFive = {
    start: Date.parse('2021-10-07T00:00:00.000Z'),
    end: Date.parse('2021-10-12T00:00:00.000Z'),
    number: 5,
  }),
  (weekSix = {
    start: Date.parse('2021-10-14T00:00:00.000Z'),
    end: Date.parse('2021-10-19T00:00:00.000Z'),
    number: 6,
  }),
  (weekSeven = {
    start: Date.parse('2021-10-21T00:00:00.000Z'),
    end: Date.parse('2021-10-26T00:00:00.000Z'),
    number: 7,
  }),
  (weekEight = {
    start: Date.parse('2021-10-28T00:00:00.000Z'),
    end: Date.parse('2021-11-02T00:00:00.000Z'),
    number: 8,
  }),
  (weekNine = {
    start: Date.parse('2021-11-04T00:00:00.000Z'),
    end: Date.parse('2021-11-09T00:00:00.000Z'),
    number: 9,
  }),
  (weekTen = {
    start: Date.parse('2021-11-11T00:00:00.000Z'),
    end: Date.parse('2021-11-16T00:00:00.000Z'),
    number: 10,
  }),
  (weekEleven = {
    start: Date.parse('2021-11-18T00:00:00.000Z'),
    end: Date.parse('2021-11-23T00:00:00.000Z'),
    number: 11,
  }),
  (weekTwelve = {
    start: Date.parse('2021-11-25T00:00:00.000Z'),
    end: Date.parse('2021-11-30T00:00:00.000Z'),
    number: 12,
  }),
  (weekThirteen = {
    start: Date.parse('2021-12-02T00:00:00.000Z'),
    end: Date.parse('2021-12-07T00:00:00.000Z'),
    number: 13,
  }),
  (weekFourteen = {
    start: Date.parse('2021-12-09T00:00:00.000Z'),
    end: Date.parse('2021-12-13T00:00:00.000Z'),
    number: 14,
  }),
  (weekFifteen = {
    start: Date.parse('2021-12-16T00:00:00.000Z'),
    end: Date.parse('2021-12-21T00:00:00.000Z'),
    number: 15,
  }),
  (weekSixteen = {
    start: Date.parse('2021-12-23T00:00:00.000Z'),
    end: Date.parse('2021-12-28T00:00:00.000Z'),
    number: 16,
  }),
  (weekSeventeen = {
    start: Date.parse('2021-12-30T00:00:00.000Z'),
    end: Date.parse('2022-01-04T00:00:00.000Z'),
    number: 17,
  }),
  (weekEighteen = {
    start: Date.parse('2022-01-06T00:00:00.000Z'),
    end: Date.parse('2022-01-11T00:00:00.000Z'),
    number: 18,
  }),
];

module.exports = function (game) {
  const startTime = Date.parse(game.commence_time);

  let weekNum = false;
  weeks.map((week) => {
    if (startTime >= week.start && startTime <= week.end) {
      weekNum = week.number;
    }
  });

  if (startTime < weeks[0].start || startTime > weeks[17].end) {
    weekNum = false;
  }

  return weekNum;
};
