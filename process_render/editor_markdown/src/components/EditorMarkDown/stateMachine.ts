import example from "./md-example"


/**状态声明 */
enum STATES{
  IDLE, // 空闲态，不需要做任何处理，即无任何输出（处理器方法），是初始态
  Code,
  Table_Begin,
  Table,
  Header,
  Text,
  Marker,
  
}


class FSM {
  /**当前状态 */
  private _state: STATES = STATES.Text;
  /**下一个状态 */
  private _next_state: STATES | null = null;
  private result: string[] = [];
  private codeSample: string[] = [];
  private _textLines:string[];

  constructor(text:string){
    this._state = STATES.IDLE; // 从空闲态开始
    this._textLines = text.split("\n");
  }

  /**
   * 启动状态机
   * 它将对文本进行逐行输入到状态机
  */
  start():void{
    this._textLines.forEach(
        (line)=>{
          this._lineProcessor(line);
        }
      )
  }

  /**描述状态的转换，即从当前状态进入下一个状态 */
  private _toNextState():void{
    if(this._next_state){
        this._state = this._next_state;
    }
    
  }
  
  /**
   * 将输入值交给当前状态对应的输入分析器进行分析
   * @param input 
   */
   _lineProcessor(input: string){
    switch(this._state){
        case STATES.Text: this._inputAnalyzer_IDLE(input);break;
        case STATES.Text: this._inputAnalyzer_Text(input);break;
        // case STATES.Marker: this._inputAnalyzer_Text(input);break;
        case STATES.Code: this._inputAnalyzer_Code(input);break;
      }
  }

  // ----------------------------------- 输入分析器们用于描述各自状态在该输入下的输出与下一个状态 -----------------------------------
  /**输入分析器：IDLE 态 */
  private _inputAnalyzer_IDLE(input:string){
    
  }
  /**输入分析器：TEXT 态 */
  private _inputAnalyzer_Text(input:string){

  }
  /**输入分析器：CODE 态 */
  private _inputAnalyzer_Code(input:string){

  }


  processText(lines:string): string[]{
    this.result = [];
    this._state = STATES.Text;

    for(let line of lines){
      this.processLine(line);
    }
    return this.result;
  }
  
  /**描述状态处理 */
  private processLine(line: string) {
    // 如果是哪一个状态则调用相应状态的处理器方法（状态转换和输出）
    switch(this._state){
      case STATES.Text: this.processTextLine(line);break;
      case STATES.Marker: this.processMarkLine(line);break;
      case STATES.Code: this.processCodeLine(line);break;
    }
  }
  
  /**状态处理方法1 */
  private processTextLine(line: string) {
    this.result.push(line);
    if(line.startsWith("<!--")){
      this.loadCodeSample(line);

      this._state = STATES.Marker;
    }
  }

  /**状态处理方法2 */
  private processMarkLine(line: string) {
    this.result.push(line);

    if(line.startsWith("```ts")){
      this.result.concat(this.codeSample);

      this._state = STATES.Code;
    }
  }

  /**状态处理方法3 */
  private processCodeLine(line: string):void {
    if(line.startsWith("```")){
      this.result.push(line);

      this._state = STATES.Text
    }
  }

  /**
   * 基于存储在`this.codeSample`中的标记加载样本
   */
  private loadCodeSample(line: string) {


  }
}

const machine = new FSM(example.example);
// 启动状态机
machine.start();