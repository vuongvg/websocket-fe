export const saveJson=(canvas) => {
    const date = new Date().toLocaleTimeString();
    const fileJson = canvas.toJSON();
    downloadFile(JSON.stringify(fileJson), `${date}.json`, "text/json");
 }
 
const downloadFile = (content, fileName, contentType) => {
    const file = new Blob([content], { type: contentType });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
 };