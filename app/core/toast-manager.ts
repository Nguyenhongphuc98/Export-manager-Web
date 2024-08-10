
class Toaster {
    excutor: any;
  
    constructor() {
      
    }
  
    setExecutor(executor: any) {
      this.excutor = executor;
    }
  
    show(message: string, miliseconds: number = 700) {
      this.excutor(message);
      setTimeout(() => {
        this.excutor('');
      }, miliseconds);
    }
  }
  
const toaster = new Toaster();
export default toaster;
  