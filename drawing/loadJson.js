export const loadJson = (e, canvas) => {
   const file = e.target.files[0];
   console.log(` file`, file)
   const reader = new FileReader();
   console.log(` reader`, reader)
   console.log('first')

   reader.onload = (e) => {
      canvas.clear();
      canvas.loadFromJSON(e.target.result, () => {
         canvas.renderAll();
      });
   };
   reader.readAsText(file);
};
