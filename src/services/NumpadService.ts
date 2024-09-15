import WebSocketHandler from './WebSocketHandler';

class NumpadService {
  private static instance: NumpadService;
  private webSocketHandler: WebSocketHandler;

  private constructor() {
    this.webSocketHandler = new WebSocketHandler('ws://localhost:8080'); // Adjust the URL as needed
  }

  public static getInstance(): NumpadService {
    if (!NumpadService.instance) {
      NumpadService.instance = new NumpadService();
    }
    return NumpadService.instance;
  }

  public connect(): void {
    this.webSocketHandler.connect();
  }

  public disconnect(): void {
    this.webSocketHandler.disconnect();
  }

  public sendKeyPress(key: string): void {
    const message = JSON.stringify({ type: 'keypress', key });
    this.webSocketHandler.sendMessage(message);
  }
}

export default NumpadService.getInstance();
