const http = {
  getRoles: () =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            name: 'Administrator',
          },
          {
            id: 2,
            name: 'ESS User',
          },
        ],
        meta: {
          total: 2,
        },
      },
    }),
  getUsers: () =>
    Promise.resolve({
      data: {
        data: [
          {
            userId: 1,
            roleId: 1,
            firstName: 'John',
            lastName: 'Doe',
          },
          {
            userId: 2,
            roleId: 1,
            firstName: 'Sam',
            lastName: 'Jackson',
          },
          {
            userId: 3,
            roleId: 2,
            firstName: 'Max',
            lastName: 'Payne',
          },
        ],
        meta: {
          total: 3,
        },
      },
    }),
};

/**
 * Write a function to return Prmoise that will resolve users with role
 * Format should be in
 * { id: "userId",
 *   firstName: "firstName",
 *   lastName: "lastName",
 *   role: {
 *     id: "roleId",
 *     name: "roleName"
 *   }
 * }
 * use promise chaining or promise all
 */

export const exercise02 = () => {
  return new Promise((resolve, reject) => {
    Promise.all([http.getUsers(), http.getRoles()])
      .then(([usersResponse, rolesResponse]) => {
        const users = usersResponse.data.data;
        const roles = rolesResponse.data.data;

        let formattedData = [];

        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < roles.length; j++) {
            if (users[i].roleId === roles[j].id) {
              formattedData.push({
                id: String(users[i].userId),
                firstName: users[i].firstName,
                lastName: users[i].lastName,
                role: {
                  id: String(roles[j].id),
                  name: roles[j].name,
                },
              });
              break;
            }
          }
        }

        resolve(formattedData);
      })
      .catch((error) => reject(error));
  });
};
