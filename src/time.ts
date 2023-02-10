// 计算当前时间并转换为对应时间的js 时效性强
import dayjs from "dayjs";
import { ifInRange, ifLessThanTenAddZero } from "./common";

/**
 * 返回对应的星期 如2023/1/10返回二
 * @param time 当前时间
 * @returns 星期
 */
const chineseWeek = (time:Date):string=>{
  const weekObj = {
    0: "日",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
  };
  const week = dayjs(time).day() as keyof typeof weekObj;
  return weekObj[week];
}

/**
 * 把s转分秒
 * @param time 秒数 number
 * @returns eg 02:30
 */
const secondToMinSecond = (time: number): string => {
  const min: number = Math.floor(time / 60);
  const second: number = Math.floor(time - min * 60);
  return `${ifLessThanTenAddZero(min)}:${ifLessThanTenAddZero(
    second
  )}`;
};
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
const chineseCurrentTime = (time: Date): string => {
  const timeNum = dayjs(time).valueOf();
  // 当前年的最开始
  const yearStart = dayjs().startOf("year").valueOf();
  // 当前月的最开始
  const monthStart = dayjs().startOf("month").valueOf();
  // 当前周的最开始
  const weekStart = dayjs().startOf("week").valueOf();
  // 当前天的最开始
  const todayStart = dayjs().startOf("day").valueOf();
  // 昨天的最开始
  const yestodayStart = dayjs().startOf("day").valueOf() - 1000 * 60 * 60 * 24;

  const year: number = dayjs(timeNum).year();
  const month: string = ifLessThanTenAddZero(dayjs(timeNum).month() + 1);
  const date: string = ifLessThanTenAddZero(dayjs(timeNum).date());
  const hour: string = ifLessThanTenAddZero(dayjs(timeNum).hour());
  const minute: string = ifLessThanTenAddZero(dayjs(timeNum).minute());
  const weekValue:string = chineseWeek(time)
  // 超出今年的年份
  if (timeNum < yearStart) {
    return `${year}-${month}-${date}`;
  }
  // 在今年不在本月中
  if (ifInRange(yearStart, monthStart, timeNum)) {
    return `${month}-${date}`;
  }
  // 在本月不在本周
  if (ifInRange(monthStart, weekStart, timeNum)) {
    return `${month}-${date}`;
  }
  // 在本周不在昨天
  if (ifInRange(weekStart, yestodayStart, timeNum)) {
    return `周${weekValue}-${hour}:${minute}`;
  }
  // 昨天的
  if (ifInRange(yestodayStart, todayStart, timeNum)) {
    return `昨天-${hour}:${minute}`;
  }
  // 当天的
  if (timeNum > todayStart) {
    return `${hour}:${minute}`;
  }
  return "时间错误";
};
export {
  chineseWeek,
  secondToMinSecond,
  chineseCurrentTime
};
