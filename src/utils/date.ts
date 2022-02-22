import { SEC_ARRAY } from "./constants";
import * as locales from "../locales";

/**
 * format Date / string / timestamp to timestamp
 * @param inputDate
 * @returns {Date}
 */
export function createDate(inputDate?: Date | string): Date {
  if (inputDate instanceof Date) {
    return inputDate;
  }

  const date = (inputDate || "")
    .toString()
    .trim()
    .replace(/\.\d+/, "") // remove milliseconds
    .replace(/-/, "/")
    .replace(/-/, "/")
    .replace(/(\d)T(\d)/, "$1 $2")
    .replace(/Z/, " UTC") // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
    .replace(/([+-]\d\d):?(\d\d)/, " $1$2"); // -04:00 -> -0400

  return new Date(date);
}

/**
 * format the diff second to *** time ago, with setting locale
 * @param diff
 * @returns number[]
 */
export function getDiffIdx(diff: number): number[] {
  /**
   * If the difference is negative, the time is in the future, then set the index to 1
   * If the difference is positive, the time is in the past, then set the index to 0
   */
  const agoIn = diff < 0 ? 1 : 0;

  /**
   * Get absolute value of number the difference parameter
   */
  let diffCopy = Math.abs(diff);

  /**
   * Set the index of the unit of time
   */
  let idx = 0;

  for (; diffCopy >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
    diffCopy /= SEC_ARRAY[idx];
  }

  /**
   * Math.floor() is alternative of ~~
   *
   * The differences and bugs:
   * Math.floor(3.7) -> 4 but ~~3.7 -> 3
   * Math.floor(1559125440000.6) -> 1559125440000 but ~~1559125440000.6 -> 52311552
   *
   * More information about the performance of algebraic:
   * https://www.youtube.com/watch?v=65-RbBwZQdU
   */
  diffCopy = Math.floor(diffCopy);

  idx *= 2;

  if (diffCopy > (idx === 0 ? 9 : 1)) idx += 1;

  return [diffCopy, idx, agoIn];
}

/**
 * Calculate the difference in seconds between two dates.
 * @param date
 * @param relativeDate
 * @returns {number}
 */
export function getDiffSec(date: Date, relativeDate: Date): number {
  return (relativeDate.getTime() - date.getTime()) / 1000;
}

/**
 * Calculate the difference in seconds between two dates.
 * @param date
 * @param relativeDate
 * @returns {number}
 */
export function getLocaleDiff(
  diff: number,
  idx: number,
  ago: number,
  locale: string
) {
  const [[, localeStrings]] = Object.entries(locales).filter(
    ([l, localeFunc]) => {
      if (l === locale) {
        return localeFunc;
      }
    }
  );

  const d = Math.floor(Math.abs(diff));

  return localeStrings[idx][ago].replace("%s", d.toString());
}
