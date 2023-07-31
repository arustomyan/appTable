type Generator<T> = (arr: T[], reset: boolean) => T;

const generator = <T>(): Generator<T> => {
  let i = 1;
  return (arr, reset = false): T => {
    if (reset) i = 0;
    if (i === arr.length) i = 0;
    return arr[i++];
  };
};

export default generator;
