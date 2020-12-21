export const getDate = () => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  const now = `${year}/${month}/${date}| ${hour}:${min}:${sec}`;
  return now;
};
