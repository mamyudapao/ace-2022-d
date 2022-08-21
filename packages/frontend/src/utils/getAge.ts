/* eslint-disable */
export const getAge = (birthday: string) => {
  const today = new Date();
  const year = parseInt(birthday.substring(0, 4));
  const month = parseInt(birthday.substring(4, 6));
  const day = parseInt(birthday.substring(6, 8));
  const birthDate = new Date(year, month - 1, day);
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth() - 1,
    birthDate.getDate()
  );

  let age = today.getFullYear() - birthDate.getFullYear();

  if (today < thisYearsBirthday) {
    age--;
  }

  return age;
};
