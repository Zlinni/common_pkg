/**
 * 返回指定范围的数字
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns 范围数字
 */
declare const returnRangeNumber: (min: number, max: number, now: number) => number;
/**
 * 判断是否在指定范围中
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns boolean
 */
declare const ifInRange: (min: number, max: number, now: number) => boolean;
/**
 * 对于小于10的数字前置加0
 * @param num
 * @returns string
 */
declare const ifLessThanTenAddZero: (num: number) => string;
/**
 * 获取字符数
 * @param str 字符串
 * @param chineseStrByte 中文作为多少个字节
 * @returns 字符数number
 */
declare const strCode: (str: string, chineseStrByte?: number) => number;
/**
 * 返回计时器Interval
 * @param timer 每隔几秒触发一次
 * @param callBack 计时器执行的函数
 * @returns 计时器id number
 */
declare const setCalTimer: (timer: number, callBack: () => void) => number;
type loopArr = Array<any>;
type loopFn = (arg: loopArr[number]) => Promise<any>;
/**
 * 异步递归 遇到失败就抛出异常暂停
 * @param taskArr 递归数组
 * @param loopFn 异步函数 参数为递归数组中的项
 */
declare const awaitLoop: (taskArr: loopArr, loopFn: loopFn) => Promise<void>;
/**
 * 更好的洗牌算法
 * @param items 排序数组
 * @returns 排序后的数组
 */
declare const shuffle: (items: Array<any>) => Array<any>;
/**
 * 创建测试异步函数
 * @param inputMsg 输入的信息
 * @param outPutMsg 输出的信息
 * @param errorMsg 错误信息，如果输入的信息等于错误信息则抛出异常
 * @param timeout 延迟
 * @returns Promise
 */
declare const createPromiseFn: (inputMsg: any, outPutMsg: any, errorMsg: any, timeout: number) => Promise<unknown>;
/**
 * 根据输入的object创建formData
 * @param obj Object
 * @returns formdata
 */
declare const createFormData: <T extends Record<string, any>>(obj: T) => T;
/**
 * 根据object返回map对象
 * @param obj object
 * @returns map对象
 */
declare const createMapper: <T extends Record<string, any>>(obj: T) => Map<any, any>;
/**
 * 反转Object键值对
 * @param Object 对象
 * @returns
 */
declare const reverseObject: <T extends Record<string, any>>(mapper: T) => Record<T[keyof T], keyof T>;

declare const common_awaitLoop: typeof awaitLoop;
declare const common_createFormData: typeof createFormData;
declare const common_createMapper: typeof createMapper;
declare const common_createPromiseFn: typeof createPromiseFn;
declare const common_ifInRange: typeof ifInRange;
declare const common_ifLessThanTenAddZero: typeof ifLessThanTenAddZero;
declare const common_returnRangeNumber: typeof returnRangeNumber;
declare const common_reverseObject: typeof reverseObject;
declare const common_setCalTimer: typeof setCalTimer;
declare const common_shuffle: typeof shuffle;
declare const common_strCode: typeof strCode;
declare namespace common {
  export {
    common_awaitLoop as awaitLoop,
    common_createFormData as createFormData,
    common_createMapper as createMapper,
    common_createPromiseFn as createPromiseFn,
    common_ifInRange as ifInRange,
    common_ifLessThanTenAddZero as ifLessThanTenAddZero,
    common_returnRangeNumber as returnRangeNumber,
    common_reverseObject as reverseObject,
    common_setCalTimer as setCalTimer,
    common_shuffle as shuffle,
    common_strCode as strCode,
  };
}

/**
 * 返回对应的星期 如2023/1/10返回二
 * @param time 当前时间
 * @returns 星期
 */
declare const chineseWeek: (time: Date) => string;
/**
 * 把s转分秒
 * @param time 秒数 number
 * @returns eg 02:30
 */
declare const secondToMinSecond: (time: number) => string;
/**
 * 返回中文的时间 时效性强
 * 超出今年的年份 返回例子: 2022-1-20
 * 在今年不在本月中 返回例子: 1-20
 * 在本月不在本周 返回例子: 1-20
 * 在本周不在昨天 返回例子: 周六-10:20
 * 昨天 返回例子: 昨天-20:00
 * 当天 返回例子: 20:00
 * 错误情况 返回例子: 时间错误
 * @param time 时间Date
 * @returns string
 */
declare const chineseCurrentTime: (time: Date) => string;

declare const time_chineseCurrentTime: typeof chineseCurrentTime;
declare const time_chineseWeek: typeof chineseWeek;
declare const time_secondToMinSecond: typeof secondToMinSecond;
declare namespace time {
  export {
    time_chineseCurrentTime as chineseCurrentTime,
    time_chineseWeek as chineseWeek,
    time_secondToMinSecond as secondToMinSecond,
  };
}

/**
 * 下载blob文件
 * @param blob blob
 * @param fileName 文件名
 */
declare const downloadFileByBlob: (blob: Blob, fileName: string) => void;
/**
 * base64转file对象
 * @param dataurl base64 url
 * @param filename 文件名称
 * @returns
 */
declare const dataURLtoFile: (dataurl: string, filename: string) => File;

declare const file_dataURLtoFile: typeof dataURLtoFile;
declare const file_downloadFileByBlob: typeof downloadFileByBlob;
declare namespace file {
  export {
    file_dataURLtoFile as dataURLtoFile,
    file_downloadFileByBlob as downloadFileByBlob,
  };
}

/**
 * 抽取array[object]中的指定项
 * @param arrayObject 对象数组
 * @param key 对象数组中的指定key
 * @param values 抽取的内容 为数组
 * @returns
 */
declare const pickKeyArrFromArrayObject: <T extends Record<string, any>>(arrayObject: T[], key: keyof T, values: any[] | (keyof T)[]) => T[];
/**
 * 删除数组中指定元素 并返回原数组
 */
declare const delSelectedElementFromArray: <T extends U[], U>(arr: T, key: U) => U[];
/**
 * 数组比较差异返回交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回交集
 */
declare const diffArrUnion: (arr1: Array<any>, arr2: Array<any>) => any;
/**
 * 数组比较差异返回差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回差集
 */
declare const diffArrDiff: (arr1: Array<any>, arr2: Array<any>) => any;
/**
 * 根据对象数组中的某一项分类数据
 * @param array 对象数组
 * @param target 目标key
 * @returns 分类后的数据
 */
declare const arrayGroupBy: <T extends Record<string, any>>(array: T[], target: keyof T) => T[][];
/**
 * 抽取出array中的字符串并拼接上你喜欢的字符
 * @param inArr string | string[]
 * @returns array + /
 */
declare const processArrayWithUnderline: (inArr: string[], inStr: string) => string;
/**
 * 如果在数组里就删除 否则就push
 * @param arr 数组
 * @param item 数组中的项
 * @param method 'push'|'unshift'
 * @returns 操作后的数组
 */
declare const addOrDelInArray: <T>(arr: T[], item: T, method?: 'push' | 'unshift') => T[];

declare const array_addOrDelInArray: typeof addOrDelInArray;
declare const array_arrayGroupBy: typeof arrayGroupBy;
declare const array_delSelectedElementFromArray: typeof delSelectedElementFromArray;
declare const array_diffArrDiff: typeof diffArrDiff;
declare const array_diffArrUnion: typeof diffArrUnion;
declare const array_pickKeyArrFromArrayObject: typeof pickKeyArrFromArrayObject;
declare const array_processArrayWithUnderline: typeof processArrayWithUnderline;
declare namespace array {
  export {
    array_addOrDelInArray as addOrDelInArray,
    array_arrayGroupBy as arrayGroupBy,
    array_delSelectedElementFromArray as delSelectedElementFromArray,
    array_diffArrDiff as diffArrDiff,
    array_diffArrUnion as diffArrUnion,
    array_pickKeyArrFromArrayObject as pickKeyArrFromArrayObject,
    array_processArrayWithUnderline as processArrayWithUnderline,
  };
}

/**
 * 注入链接到a标签并模拟点击
 * @param url 链接
 * @param fileName 文件名字
 */
declare const injectHerf: (url: string) => void;

declare const dom_injectHerf: typeof injectHerf;
declare namespace dom {
  export {
    dom_injectHerf as injectHerf,
  };
}

export { array, common, dom, file, time };
