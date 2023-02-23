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

/**
 * file或blob 转base64
 * @param {*} blob file或者blob
 * @param {*} callback function (data)通过参数获得base64
 */
const blobToBase64 = (blob: Blob, callback: (res: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result as string);
  });
  reader.readAsDataURL(blob);
};

/**
 * 下载url 需要axios!!
 * @param url 链接
 * @param fileName 文件名字
 */
// const downloadByUrl = (url: string, fileName: string) => {
//     const config = {
//       responseType: "blob",
//     } as any;
//     axios.get(url, config).then((res) => {
//       // 注意设置type
//       const blob = new Blob([res.data], {
//         type: res.data.type,
//       });
//       downloadFileByBlob(blob, fileName);
//     });
//   };
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

export { downloadFileByBlob, dataURLtoFile,blobToBase64
 };
