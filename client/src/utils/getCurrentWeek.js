const weeks = [
  {
    start: Date.parse('2021-09-10T00:00:00.000Z'),
    end: Date.parse('2021-09-14T00:00:00.000Z'),
    number: 1,
  },
  {
    start: Date.parse('2021-09-14T00:00:00.000Z'),
    end: Date.parse('2021-09-21T00:00:00.000Z'),
    number: 2,
  },
  {
    start: Date.parse('2021-09-21T00:00:00.000Z'),
    end: Date.parse('2021-09-28T00:00:00.000Z'),
    number: 3,
  },
  {
    start: Date.parse('2021-09-28T00:00:00.000Z'),
    end: Date.parse('2021-10-05T00:00:00.000Z'),
    number: 4,
  },
  {
    start: Date.parse('2021-10-05T00:00:00.000Z'),
    end: Date.parse('2021-10-12T00:00:00.000Z'),
    number: 5,
  },
  {
    start: Date.parse('2021-10-12T00:00:00.000Z'),
    end: Date.parse('2021-10-19T00:00:00.000Z'),
    number: 6,
  },
  {
    start: Date.parse('2021-10-19T00:00:00.000Z'),
    end: Date.parse('2021-10-26T00:00:00.000Z'),
    number: 7,
  },
  {
    start: Date.parse('2021-10-26T00:00:00.000Z'),
    end: Date.parse('2021-11-02T00:00:00.000Z'),
    number: 8,
  },
  {
    start: Date.parse('2021-11-02T00:00:00.000Z'),
    end: Date.parse('2021-11-09T00:00:00.000Z'),
    number: 9,
  },
  {
    start: Date.parse('2021-11-09T00:00:00.000Z'),
    end: Date.parse('2021-11-16T00:00:00.000Z'),
    number: 10,
  },
  {
    start: Date.parse('2021-11-16T00:00:00.000Z'),
    end: Date.parse('2021-11-23T00:00:00.000Z'),
    number: 11,
  },
  {
    start: Date.parse('2021-11-23T00:00:00.000Z'),
    end: Date.parse('2021-11-30T00:00:00.000Z'),
    number: 12,
  },
  {
    start: Date.parse('2021-11-30T00:00:00.000Z'),
    end: Date.parse('2021-12-07T00:00:00.000Z'),
    number: 13,
  },
  {
    start: Date.parse('2021-12-07T00:00:00.000Z'),
    end: Date.parse('2021-12-13T00:00:00.000Z'),
    number: 14,
  },
  {
    start: Date.parse('2021-12-13T00:00:00.000Z'),
    end: Date.parse('2021-12-21T00:00:00.000Z'),
    number: 15,
  },
  {
    start: Date.parse('2021-12-21T00:00:00.000Z'),
    end: Date.parse('2021-12-28T00:00:00.000Z'),
    number: 16,
  },
  {
    start: Date.parse('2021-12-28T00:00:00.000Z'),
    end: Date.parse('2022-01-04T00:00:00.000Z'),
    number: 17,
  },
  {
    start: Date.parse('2022-01-04T00:00:00.000Z'),
    end: Date.parse('2022-01-11T00:00:00.000Z'),
    number: 18,
  },
];

export const getCurrentWeek = (date) => {
  let weekNum = false;
  weeks.forEach((week) => {
    if (date >= week.start && date <= week.end) {
      weekNum = week.number;
    }
  });

  if (date < weeks[0].start || date > weeks[17].end) {
    weekNum = 1;
  }

  return weekNum;
};
