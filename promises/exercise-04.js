class FileSystem {
  readFile(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersTxt = JSON.stringify({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        });
        resolve(usersTxt);
      }, 100);
    });
  }
}

/**
 * Re-write the following with promise
 */
export const exercise04 = () => {
  return new Promise((resolve, reject) => {
    const fs = new FileSystem();
    const readContent = (content) => {
      // console.log(content);
    };
    fs.readFile('./users.txt').then((data) => {
      readContent(data);
      resolve(JSON.parse(data));
    });
  });
};
