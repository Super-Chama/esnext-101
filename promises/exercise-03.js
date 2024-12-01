const http = {
  getTimeSheetPeriods: () =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 228,
            start: '2024-11-04',
            end: '2024-12-10',
            active: false,
          },
          {
            id: 229,
            start: '2024-11-11',
            end: '2024-12-17',
            active: false,
          },
          {
            id: 230,
            start: '2024-11-18',
            end: '2024-12-24',
            active: false,
          },
          {
            id: 231,
            start: '2024-11-25',
            end: '2024-12-01',
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
      project: 'Some Project',
      value: '1:00',
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
  return new Promise((resolve, reject) => {
    http
      .getTimeSheetPeriods()
      .then((response) => {
        const timesheetPeriods = response.data.data;
        const activePeriods = timesheetPeriods.filter((item) => item.active);
        return activePeriods;
      })
      .then((data) => {
        return http.getTimesheetRecords(data[0].id);
      })
      .then((response) => {
        const formattedData = response.data.data.map((item) => ({
          ...item,
          id: String(item.id),
          periodId: String(item.periodId),
        }));
        resolve(formattedData);
      })
      .catch((error) => reject(error));
  });
};
