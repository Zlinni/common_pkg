# common_pkg
个人工具库

# 前置
需要安装dayjs
# 使用 
```typescript
import { time as time_pkg, common as common_pkg } from "zlinni_common_pkg";
import dayjs from 'dayjs';

const weekVal:string = time_pkg.chineseWeek(dayjs())
console.log(weekVal);//对应返回星期的数字
```
# common函数
```typescript
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
/**
 * base64转file对象
 * @param dataurl base64 url
 * @param filename 文件名称
 * @returns
 */
declare const dataURLtoFile: (dataurl: string, filename: string) => File;
/**
 * 裁剪图片
 * @param file 文件
 * @returns 裁剪后的图片 file格式
 */
declare const convertImage: (file: File) => Promise<File>;
/**
 * 下载blob文件
 * @param blob blob
 * @param fileName 文件名
 */
declare const downloadFileByBlob: (blob: Blob, fileName: string) => void;
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
```
# time函数
```typescript
/**
 * 返回对应的星期 如2023/1/10返回二
 * @param time 当前时间
 * @returns 星期
 */
declare const chineseWeek: (time: Date) => string;
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
```