export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 100);
};

export const convertUnixTimestampToDate = (unixTimeStamp) => {
  const milliseconds = unixTimeStamp;
  return new Date(milliseconds).toLocaleDateString();
};

export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
