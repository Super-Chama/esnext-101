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
  // your code here
  return Promise.all([http.getRoles(), http.getUsers()]).then(([roles, users]) => {
    return users.data.data.map((user) => {
      const role = roles.data.data.find((role) => role.id === user.roleId);
      return {
        id: user.userId.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        role: {
           id: role.id.toString(),
           name: role.name,
         },
       };
     });
   });

};
