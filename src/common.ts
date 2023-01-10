/**
 * 返回指定范围的数字
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns 范围数字
 */
const returnRangeNumber = (
  min: number,
  max: number,
  now: number
): number => {
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

/**
 * base64转file对象
 * @param dataurl base64 url
 * @param filename 文件名称
 * @returns
 */
const dataURLtoFile = (dataurl: string, filename: string) => {
  // base64转file对象
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/);
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (mime) {
    return new File([u8arr], filename, { type: mime[1] }); // 转成了jpeg格式
  }
};

// 思路是创建一个图片，将file等于这个图片，然后创建一个canvas图层 ，将canvas等比例缩放，
// 然后用canvas的drawImage将图片与canvas合起来，然后在把canvas的base64转成file即可
/**
 * 裁剪图片
 * @param file 文件
 * @returns 裁剪后的图片 file格式
 */
const convertImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    const fileName = file.name.substring(0, file.name.indexOf("."));
    const reader = new FileReader(); // 读取file
    reader.readAsDataURL(file);
    reader.onloadend = (e: any) => {
      const image = new Image(); // 新建一个img标签（还没嵌入DOM节点)
      image.src = e.target.result; // 将图片的路径设成file路径
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const imageWidth = image.width;
        // 考虑到长途的情况 这里是按比例切分 比如他的比例宽高超过了1:3则强行剪成1:3
        const ratioHeight = 3 * image.width;
        const imageHeight =
          image.height > ratioHeight ? ratioHeight : image.height;
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        if (context) {
          context.drawImage(
            image,
            0,
            0,
            imageWidth,
            imageHeight,
            0,
            0,
            imageWidth,
            imageHeight
          );
          const newfile = dataURLtoFile(
            canvas.toDataURL("image/jpeg"),
            `${fileName}.jpeg`
          ) as File;
          resolve(newfile);
        }
        // 超出裁剪 这一步还可以优化就是如果缩略图不需要那么大的像素点 可以缩小像素点
      };
    };
  });

/**
 * 下载blob文件
 * @param blob blob
 * @param fileName 文件名
 */
const downloadFileByBlob = (blob: Blob, fileName: string): void => {
  const blobUrl: string = window.URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement("a");
  link.download = fileName || "testFile";
  link.style.display = "none";
  link.href = blobUrl;
  // 触发点击
  document.body.appendChild(link);
  link.click();
  // 移除
  document.body.removeChild(link);
};

type loopArr = Array<any>;
type loopFn = (arg:loopArr[number])=>Promise<any>
/**
 * 异步递归 遇到失败就抛出异常暂停
 * @param taskArr 递归数组
 * @param loopFn 异步函数 参数为递归数组中的项
 */
const awaitLoop = async (taskArr: loopArr, loopFn: loopFn) => {
  try {
    const num = await loopFn(taskArr.shift());
    console.log(num);
    if (num) {
      awaitLoop(taskArr, loopFn);
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * 更好的洗牌算法
 * @param items 排序数组
 * @returns 排序后的数组
 */
const shuffle = (items:Array<any>):Array<any> => {
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
const createPromiseFn = (inputMsg:any,outPutMsg:any,errorMsg:any,timeout:number):Promise<unknown>=>{
    return new Promise((resolve,reject)=>{
        if(inputMsg===errorMsg)reject(new Error(errorMsg))
        setTimeout(() => {
           resolve(outPutMsg) 
        }, timeout);
    })
}

export  {
    returnRangeNumber,
    ifInRange,
    ifLessThanTenAddZero,
    strCode,
    setCalTimer,
    dataURLtoFile,
    convertImage,
    downloadFileByBlob,
    awaitLoop,
    shuffle,
    createPromiseFn
}