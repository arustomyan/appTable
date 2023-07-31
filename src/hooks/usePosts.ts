import useSorted from "./useSorted";

export const usePosts = (array: any[], sortableProperty: string) => {
  const resultArray = useSorted(array, sortableProperty);
  return resultArray;
};
