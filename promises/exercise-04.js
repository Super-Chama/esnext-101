class FileSystem {
  readFile(path, callback) {
    setTimeout(() => {
      const usersTxt = JSON.stringify({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
      callback(usersTxt);
    }, 100);
  }
}

/**
 * Re-write the following with promise
 */
export const exercise04 = () => {
  const fs = new FileSystem();
  const readContent = (content) => {
    console.log(content);
  };

  fs.readFile("./users.txt", readContent);
};
