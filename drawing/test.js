document.getElementById('test').addEventListener('click',()=>{
    canvas.getActiveObjects().forEach((obj) => {
        console.log(`  ~ obj`, obj)
        // canvas.remove(obj)
      });

})