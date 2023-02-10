/**
 * 注入链接到a标签并模拟点击
 * @param url 链接
 * @param fileName 文件名字
 */
const injectHerf = (url: string) => {
    const link: HTMLAnchorElement = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    // 新页面打开
    link.target = "_blank";
    // 触发点击
    document.body.appendChild(link);
    link.click();
    // 移除
    document.body.removeChild(link);
  };

export {
    injectHerf
}