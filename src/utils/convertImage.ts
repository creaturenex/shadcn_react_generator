// export default function convertImage(file){
//   const fr = new FileReader();
//   fr.onload = () => callback(null, fr.result);
//   fr.onerror = (err) => callback(err);
//   fr.readAsDataURL(file);
// }

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result
// has to be async as this operation is asynchronous 
export default function convertImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(file);
  });
}