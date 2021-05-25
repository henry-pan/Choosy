export const randomizeArr = (inputArr) => {
  let arr = [...inputArr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const subDivideArrByScore = (arr) => {
  let newArr = [...arr];
  let randArr = [];
  let startI = 0;
  for (let i = 0; i < newArr.length; i++) {
    if ((newArr[i].score < newArr[i + 1].score || newArr[i + 1] === undefined)) {
      randArr = randArr.concat([newArr.slice(startI, i + 1)]);
      startI = i + 1;
    };
  }
  return randArr;
}
