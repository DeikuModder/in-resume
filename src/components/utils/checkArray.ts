export const checkArray = <T>(arr: T[], oldArr: T[]) => {
  if (!oldArr || oldArr.length <= 0) return arr;

  if (arr.length <= 0) {
    return oldArr;
  }

  return arr;
};
