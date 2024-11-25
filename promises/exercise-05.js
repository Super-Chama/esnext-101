const model = {
  firstName: "John",
  lastName: "Doe",
  middleName: "Smith",
  contactNumber: "1234567890",
  email: "john.doe@example.com",
  joinedDate: "2024-01-01",
  swtichJobDetails: true,
  addressCity: "New York",
  addressCountryCode: { cou_code: "US", id: "US" },
  addressZipCode: "10001",
  addressProvince: { province_code: "NY", id: "NY" },
  addressStreet1: "123 Main St",
  addressStreet2: "Apt 4B",
  employmentStatus: { id: "1" },
  swtichSalaryDetails: true,
  currency: { currency_id: "USD" },
  payGrade: { id: "PG1" },
  salaryComponentValues: [
    { id: "1", value: 75000 },
    { id: "2", value: 5000 },
  ],
  directSupervisors: [
    {
      empNumber: "SUP001",
      firstName: "Jane",
      lastName: "Smith",
      terminationId: null,
    },
  ],
};

const directReportingMethod = {
  value: {
    id: "1",
  },
};

const addAsAnEmployeeModal = {
  candidateId: 1,
  vacancy: {
    vacancyId: 1,
  },
};

const http = {
  getVacancies: (queryParams) =>
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
        ],
        meta: {
          total: 1,
        },
      },
    }),
  getEmployees: () =>
    Promise.resolve({
      data: {
        meta: {
          nextEmployeeId: "EMP001",
        },
      },
    }),
  customSessionDataWizardGet: () =>
    Promise.resolve({
      data: {
        data: {
          actions: [],
        },
      },
    }),
  customSessionDataWizardPut: (data) => Promise.resolve({ data }),
  wizardCustomFieldAttachmentData: () => Promise.resolve({}),
  redirectToPIMWizard: () => Promise.resolve(),
};

/**
 * Refactor this functions to prevent promise hell
 * https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513
 */
export const exercise05 = () => {
  let addingAsAnEmployee = true;
  http
    .getEmployees()
    .then((response) => {
      const suggestedNewEmployeeId = response.data.meta.nextEmployeeId;
      http
        .wizardCustomFieldAttachmentData()
        .then(() => {
          const queryParams = {
            filter: {
              excludeClosedVacancies: true,
              hiringManager: null,
              locations: null,
              publishedDateFrom: null,
              publishedDateTo: null,
              status: null,
              subUnits: null,
              titles: null,
              vacancies: null,
              vacancyName: null,
            },
            include: "Location,JobTitle,SubUnit,Status",
            limit: 20,
            orderBy: "ASC",
            orderField: "name",
            pageNo: 1,
          };
          http
            .getVacancies(queryParams)
            .then((response) => {
              const filteredVacancy = response.data.data.find(
                (vacancy) =>
                  vacancy.vacancyId === addAsAnEmployeeModal?.vacancy?.vacancyId
              );
              const locationId = filteredVacancy.locationId;
              const jobTitleId = filteredVacancy.jobTitle.code;
              const supervisors = directReportingMethod.value
                ? model.directSupervisors?.reduce(
                    (obj, item) => (
                      (obj[item.empNumber] = {
                        supervisorId: item.empNumber,
                        reportingMethodId: directReportingMethod.value?.id,
                        supervisor: {
                          ...item,
                          termination_id: item.terminationId || null,
                          purged_at: null,
                        },
                        ReportingMethod: directReportingMethod.value,
                      }),
                      obj
                    ),
                    {}
                  )
                : null;
              const data = {
                employee: {
                  firstName: model.firstName,
                  lastName: model.lastName,
                  middleName: model.middleName,
                  locationId: locationId,
                  joinedDate: model.joinedDate,
                  terminationId: null,
                  purged_at: null,
                  deleted_at: null,
                  emp_mobile: model.contactNumber,
                  emp_oth_email: model.email,
                  employeeId: suggestedNewEmployeeId,
                  ...(model.swtichJobDetails
                    ? {
                        city: (model.addressCity ?? "").trim() || "",
                        country:
                          model.addressCountryCode?.cou_code ||
                          model.addressCountryCode?.id ||
                          "",
                        emp_zipcode: (model.addressZipCode ?? "").trim() || "",
                        province:
                          (model.addressCountryCode?.cou_code ||
                            model.addressCountryCode?.id) === "US"
                            ? model.addressProvince?.province_code ||
                              model.addressProvince?.id
                            : (model.addressProvince ?? "").trim() || "",
                        street1: (model.addressStreet1 ?? "").trim() || "",
                        street2: (model.addressStreet2 ?? "").trim() || "",
                      }
                    : undefined),
                },
                employeeJobRecord: {
                  job_title_id: jobTitleId,
                  joined_date: model.joinedDate,
                  employment_status_id: model.employmentStatus?.id || null,
                },
                ...(model.swtichSalaryDetails
                  ? {
                      salary: {
                        currency_id: model.currency?.currency_id,
                        pay_grade_id: model.payGrade?.id,
                        annual_basic_payment: model.salaryComponentValues?.find(
                          (salaryComponentValue) =>
                            salaryComponentValue.id === "1"
                        )?.value,
                        components: model.salaryComponentValues,
                      },
                    }
                  : undefined),
                ...(model.swtichJobDetails && directReportingMethod.value
                  ? { supervisors: supervisors }
                  : undefined),
              };
              http
                .customSessionDataWizardPut({ data: data })
                .then(() => {
                  http
                    .customSessionDataWizardGet()
                    .then((obj) => {
                      const employeeData = {
                        chkLogin: false,
                        firstName: model.firstName,
                        lastName: model.lastName,
                        middleName: model.middleName,
                        locationId: locationId,
                        employeeId: suggestedNewEmployeeId,
                        joinedDate: model.joinedDate,
                      };
                      const action = {
                        endpoint: "employees",
                        method: "POST",
                        data: employeeData,
                        params: {
                          addCandidateAsEmployee: true,
                          candidateInitialData: {
                            employee: data.employee,
                            employeeJobRecord: data.employeeJobRecord,
                            candidateId: addAsAnEmployeeModal?.candidateId,
                            ...(model.swtichJobDetails &&
                            directReportingMethod.value
                              ? {
                                  supervisors: model.directSupervisors?.map(
                                    (directSupervisor) => {
                                      return {
                                        supervisorId:
                                          directSupervisor.empNumber,
                                        reportingMethodId:
                                          directReportingMethod.value?.id,
                                      };
                                    }
                                  ),
                                }
                              : undefined),
                            ...(model.swtichSalaryDetails
                              ? {
                                  salary: {
                                    currency_id:
                                      model.currency?.currency_id || null,
                                    pay_grade_id: model.payGrade?.id || null,
                                    components:
                                      model.salaryComponentValues || [],
                                  },
                                }
                              : undefined),
                          },
                        },
                        extra: { employee: true },
                      };
                      obj.data.data.actions = [action];
                      http
                        .redirectToPIMWizard(obj.data)
                        .then(() => {
                          addingAsAnEmployee = false;
                          console.log("Redirected to PIM Wizard");
                        })
                        .catch(() => {
                          addingAsAnEmployee = false;
                          console.log("redirectToPIMWizard failed");
                        });
                    })
                    .catch(() => {
                      addingAsAnEmployee = false;
                      console.log("customSessionDataWizardGet failed");
                    });
                })
                .catch(() => {
                  addingAsAnEmployee = false;
                  console.log("customSessionDataWizardPut failed");
                });
            })
            .catch(() => {
              addingAsAnEmployee = false;
              console.log("getVacancies failed");
            });
        })
        .catch(() => {
          addingAsAnEmployee = false;
          console.log("wizardCustomFieldAttachmentData failed");
        });
    })
    .catch(() => {
      addingAsAnEmployee = false;
      console.log("getEmployees failed");
    });
};
