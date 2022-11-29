import line from "./drawingLine";
import free from "./drawingFree";
import circle from "./drawingCircle";

class Drawing{
    constructor(line,free,circle){
        this.line=line
        this.free=free
        this.circle=circle
    }
}

const drawing= new Drawing(line,free,circle)

export default drawing