export const countTotalDocuments = (directories: any[]) => {
  const amount = directories.reduce((count, directory) => {
    return count + directory.documents.length;
  }, 0);
  return amount;
};
