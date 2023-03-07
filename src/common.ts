/**
 * 返回指定范围的数字
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns 范围数字
 */
const returnRangeNumber = (min: number, max: number, now: number): number => {
  if (now > max) return max;
  if (now < min) return min;
  return now;
};
/**
 * 判断是否在指定范围中
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns boolean
 */
const ifInRange = (min: number, max: number, now: number): boolean =>
  now > min && now < max;

/**
 * 对于小于10的数字前置加0
 * @param num
 * @returns string
 */
const ifLessThanTenAddZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

/**
 * 获取字符数
 * @param str 字符串
 * @param chineseStrByte 中文作为多少个字节
 * @returns 字符数number
 */
const strCode = (str: string, chineseStrByte = 3): number => {
  // 字符编码大于255，说明是双字节字符(即是中文)
  return str.split("").reduce((pre, cur, idx) => {
    pre += str.charCodeAt(idx) > 255 ? chineseStrByte : 1;
    return pre;
  }, 0);
};

/**
 * 返回计时器Interval
 * @param timer 每隔几秒触发一次
 * @param callBack 计时器执行的函数
 * @returns 计时器id number
 */
const setCalTimer = (timer: number, callBack: () => void): number =>
  window.setInterval(() => callBack(), timer);



type loopArr = Array<any>;
type loopFn = (arg: loopArr[number]) => Promise<any>;
/**
 * 异步递归 遇到失败就抛出异常暂停
 * @param taskArr 递归数组
 * @param loopFn 异步函数 参数为递归数组中的项
 */
const awaitLoop = async (taskArr: loopArr, loopFn: loopFn) => {
  try {
    if (taskArr.length === 0) return;
    await loopFn(taskArr.shift());
  } catch (error) {
    throw new Error(error as string);
  }
};

/**
 * 更好的洗牌算法
 * @param items 排序数组
 * @returns 排序后的数组
 */
const shuffle = (items: Array<any>): Array<any> => {
  items = [...items];
  for (let i = items.length; i > 0; i--) {
    const idx = Math.floor(Math.random() * i);
    [items[idx], items[i - 1]] = [items[i - 1], items[idx]];
  }
  return items;
};

/**
 * 创建测试异步函数
 * @param inputMsg 输入的信息
 * @param outPutMsg 输出的信息
 * @param errorMsg 错误信息，如果输入的信息等于错误信息则抛出异常
 * @param timeout 延迟
 * @returns Promise
 */
const createPromiseFn = (
  inputMsg: any,
  outPutMsg: any,
  errorMsg: any,
  timeout: number
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (inputMsg === errorMsg) reject(new Error(errorMsg));
    setTimeout(() => {
      resolve(outPutMsg);
    }, timeout);
  });
};

/**
 * 根据输入的object创建formData
 * @param obj Object
 * @returns formdata
 */
const createFormData = <T extends Record<string, any>>(
  obj: T
): Required<T> | T => {
  return Object.keys(obj).reduce((pre, key) => {
    pre.append(key, obj[key]);
    return pre;
  }, new FormData()) as unknown as T;
};  

/**
 * 根据object返回map对象
 * @param obj object
 * @returns map对象
 */
const createMapper = <T extends Record<string, any>>(obj: T):Map<keyof T,T[keyof T]> => {
  return Object.keys(obj).reduce((pre,key) => {
    pre.set(key, obj[key]);
    return pre;
  },new Map());
};
/**
 * 反转Object键值对
 * @param Object 对象
 * @returns
 */
const reverseObject = <T extends Record<string, any>>(mapper: T):Record<T[keyof T], keyof T> => {
  return Object.keys(mapper).reduce((pre, curKey: keyof T) => {
    pre[mapper[curKey]] = curKey;
    return pre;
  }, {} as Record<T[keyof T], keyof T>);
};
/**
 * 获取url中的参数
 * @param url url
 * @returns 参数
 */
const getUrlSearchToObject = <T>(
  url = window.location.search
): Record<keyof T, string> => {
  const urlStr = url.split("?")[1];
  const paramsArr = urlStr.split("&");
  return paramsArr.reduce((pre, cur) => {
    const arr = cur.split("=");
    const [key, value] = arr;
    pre[key as keyof T] = value;
    return pre;
  }, {} as Record<keyof T, string>);
};


export {
  returnRangeNumber,
  ifInRange,
  ifLessThanTenAddZero,
  strCode,
  setCalTimer,
  awaitLoop,
  shuffle,
  createPromiseFn,
  createFormData,
  createMapper,
  reverseObject,
  getUrlSearchToObject
};
