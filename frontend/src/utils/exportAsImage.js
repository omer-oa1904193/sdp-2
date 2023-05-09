import html2canvas from "html2canvas";

function downloadImage(imageData, fileName) {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = imageData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Downloading image')
}

export default async function exportAsImage(element, imageFileName) {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;
    let htmlHeight = html.clientHeight;
    let bodyHeight = body.clientHeight;
    const newWidth = element.scrollWidth - element.clientWidth;
    const newHeight = element.scrollHeight - element.clientHeight;
    if (newWidth > element.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }
    if (newHeight > element.clientHeight) {
      htmlHeight += newHeight;
      bodyHeight += newHeight;
    }
    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";
    html.style.height = htmlHeight + "px";
    body.style.height = bodyHeight + "px";
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
    html.style.width = null;
    body.style.width = null;
    html.style.height = null;
    body.style.height = null;
  }
  
