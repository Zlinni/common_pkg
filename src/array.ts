/**
 * 抽取array[object]中的指定项
 * @param arrayObject 对象数组
 * @param key 对象数组中的指定key
 * @param values 抽取的内容 为数组
 * @returns
 */
const pickKeyArrFromArrayObject = <T extends Record<string, any>>(
  arrayObject: Array<T>,
  key: keyof T,
  values: Array<keyof T> | any[]
): T[] => arrayObject.filter((item) => item[key] && values.includes(item[key]));

/**
 * 删除数组中指定元素 并返回原数组
 */
const delSelectedElementFromArray = <T extends Array<U>, U>(
  arr: T,
  key: U
): U[] => {
  arr.splice(arr.indexOf(key), 1);
  return arr;
};
/**
 * 删除数组中指定下标元素 并返回原数组
 */
const delSelectedElementFromArrayByIdx = <T extends Array<U>, U>(
  arr: T,
  idx: number
): U[] => {
  arr.splice(idx, 1);
  return arr;
};
/**
 * 数组比较差异返回交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回交集
 */
const diffArrUnion = <T extends Array<any>>(arr1: T, arr2: T): T => {
  return arr1.reduce((res, key1) => {
    const sameKey = arr2.find((key2) => key2 === key1);
    sameKey && res.push(sameKey);
    return res;
  }, [] as unknown as T);
};
/**
 * 数组比较差异返回差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回差集
 */
const diffArrDiff = (arr1: Array<any>, arr2: Array<any>) => {
  return arr1.reduce((pre, cur) => {
    const res = arr2.some((item2) => item2 === cur);
    !res && pre.push(cur);
    return pre;
  }, []);
};

const groupBy = <T extends Record<string, any>>(
  array: T[],
  callBack: (item: T) => any
): T[][] => {
  const memo = array.reduce((pre, cur) => {
    const mark = JSON.stringify(callBack(cur));
    pre[mark] = pre[mark] || [];
    pre[mark].push(cur);
    return pre;
  }, {} as Record<string, T[]>);
  return Object.keys(memo).map((key) => memo[key]);
};

/**
 * 根据对象数组中的某一项分类数据
 * @param array 对象数组
 * @param target 目标key
 * @returns 分类后的数据
 */
const arrayGroupBy = <T extends Record<string, any>>(
  array: T[],
  target: keyof T
): T[][] => {
  return groupBy(array, (item) => item[target]);
};
/**
 * 抽取出array中的字符串并拼接上你喜欢的字符
 * @param inArr string | string[]
 * @returns array + /
 */
const processArrayWithUnderline = (inArr: string[], inStr: string): string => {
  if (Array.isArray(inArr)) {
    if (inArr.length === 0) return "";
    const str = inArr.reduce((pre, cur) => {
      return (pre += cur + inStr);
    }, "");
    const inStrLen = inStr.length;
    return str.slice(0, -inStrLen);
  }
  return inArr;
};

/**
 * 如果在数组里就删除 否则就push
 * @param arr 数组
 * @param item 数组中的项
 * @param method 'push'|'unshift'
 * @returns 操作后的数组
 */
const addOrDelInArray = <T>(arr: T[], item: T, method?: "push" | "unshift") => {
  // 有就删除 没有就加入
  arr.includes(item)
    ? delSelectedElementFromArray(arr, item)
    : arr?.[method ?? "push"](item);
  return arr;
};

/**
 * 将数组分割成每n份为一组
 * @param arr 数组
 * @param size n份
 * @returns 分割后的数组
 */
const sliceArray = <T>(arr: T[], size: number): T[][] => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i = i + size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

export {
  pickKeyArrFromArrayObject,
  delSelectedElementFromArray,
  delSelectedElementFromArrayByIdx,
  diffArrUnion,
  diffArrDiff,
  arrayGroupBy,
  processArrayWithUnderline,
  addOrDelInArray,
  sliceArray,
};
