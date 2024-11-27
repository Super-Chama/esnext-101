const http = {
  getTimeSheetPeriods: () =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 228,
            start: "2024-11-04",
            end: "2024-12-10",
            active: false,
          },
          {
            id: 229,
            start: "2024-11-11",
            end: "2024-12-17",
            active: false,
          },
          {
            id: 230,
            start: "2024-11-18",
            end: "2024-12-24",
            active: false,
          },
          {
            id: 231,
            start: "2024-11-25",
            end: "2024-12-01",
            active: true,
          },
        ],
        meta: {
          total: 4,
        },
      },
    }),
  getTimesheetRecords: (periodId) => {
    const records = new Array(10).fill(null).map((_, i) => ({
      id: i + 1,
      periodId: periodId,
      project: "Some Project",
      value: "1:00",
    }));

    return Promise.resolve({
      data: {
        data: [...records],
        meta: {
          total: records.length,
        },
      },
    });
  },
};

/**
 * Write a function to return Prmoise that will resolve timesheet records
 * by active timesheet period. Format should be in
 * {
 *  id: "recordId",
 *  periodId: "periodId",
 *  project: "project",
 *  value: "value",
 * }
 * use promise chaining
 */

export const exercise03 = () => {
  // your code here
  return http
    .getTimeSheetPeriods()
    .then((response) => {
      const activePeriod = response.data.data.filter((period) => period.active);
      return { activePeriod };
    })
    .then(({ activePeriod }) => {
      return Promise.all(
        activePeriod.map((period) =>
          http.getTimesheetRecords(period.id).then((response) =>
            response.data.data.map((record) => {
              return {
                id: record.id.toString(),
                periodId: record.periodId.toString(),
                project: record.project,
                value: record.value,
              };
            })
          )
        )
      );
    })
    .then((records) => records.flat());
};
