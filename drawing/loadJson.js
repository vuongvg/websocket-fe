document.getElementById("input-file").addEventListener("change", (e) => loadJsonFn(e));

const loadJsonFn = (e) => {
   const file = e.target.files[0];
   const reader = new FileReader();
   reader.onload = (e) => {
      canvas.clear();
      canvas.loadFromJSON(e.target.result, () => {
         canvas.renderAll();
      });
   };
   reader.readAsText(file);
};
