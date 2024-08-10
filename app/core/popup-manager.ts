
class PopupManager {
    excutor: any;
  
    constructor() {
      
    }
  
    setExecutor(executor: any) {
      this.excutor = executor;
    }
  
    show(message: string) {
      this.excutor(message);
    }

    close() {
        this.excutor('');
    }
  }
  
const popupManager = new PopupManager();
export default popupManager;
  