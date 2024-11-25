const http = {
  getVacancies: () =>
    Promise.resolve({
      data: {
        data: [
          {
            vacancyId: 1,
            locationId: "LOC001",
            jobTitle: {
              code: "JOB001",
            },
            name: "Software Engineer",
          },
          {
            vacancyId: 2,
            locationId: "LOC001",
            jobTitle: {
              code: "JOB002",
            },
            name: "Senior Software Engineer",
          },
          {
            vacancyId: 3,
            locationId: "LOC001",
            jobTitle: {
              code: "JOB003",
            },
            name: "QA Engineer",
          },
          {
            vacancyId: 4,
            locationId: "LOC001",
            jobTitle: {
              code: "JOB004",
            },
            name: "Senior QA Engineer",
          },
        ],
        meta: {
          total: 4,
        },
      },
    }),
};

/**
 * Write a function to return Prmoise that will resolve vacancies
 * formatted for using in dropdown component.
 * Format should be in { id: "vacancyId", label: "vacancyName" }
 */

export const exercise01 = () => {
  return new Promise((resolve) => {
    http.getVacancies().then((response) =>
      resolve(
        response.data.data.map((vacancy) => ({
          id: vacancy.vacancyId.toString(),
          label: vacancy.name,
        }))
      )
    );
  });
};
