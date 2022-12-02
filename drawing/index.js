import line from "./drawingLine";
import free from "./drawingFree";
import circle from "./drawingCircle";
import eraser from "./eraser";
import move from "./moveObject";
import text from "./textBox";

class Drawing{
    constructor(line,free,circle,eraser,move,text){
        this.line=line
        this.free=free
        this.circle=circle
        this.eraser=eraser
        this.text=text
        // this.move=move
    }
}

const drawing= new Drawing(line,free,circle,eraser,move,text)

export default drawing