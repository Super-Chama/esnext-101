const http = {
  getRoles: () =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            name: "Administrator",
          },
          {
            id: 2,
            name: "ESS User",
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
            firstName: "John",
            lastName: "Doe",
          },
          {
            userId: 2,
            roleId: 1,
            firstName: "Sam",
            lastName: "Jackson",
          },
          {
            userId: 3,
            roleId: 2,
            firstName: "Max",
            lastName: "Payne",
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
  return Promise.all([
    http.getRoles(),
    http.getUsers(),
  ]).then(results => {
    const roles = results[0].data.data;
    const users = results[1].data.data;

    const roleMap = new Map();
    roles.forEach(role => {
      roleMap.set(role.id, role.name);
    });

    return users.map(user => ({
      id: user.userId.toString(),
      firstName: user.firstName,
      lastName: user.lastName,

      role: {
        id: user.roleId.toString(),
        name: roleMap.get(user.roleId),
      }
    }));
  });
};
