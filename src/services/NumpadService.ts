import WebSocketHandler, { WebSocketEvent } from './WebSocketHandler';

class NumpadService {
    private static instance: NumpadService;
    private webSocketHandler: WebSocketHandler;
    private connectionChangeCallback: ((isConnected: boolean) => void) | null = null;

    private static readonly WS_URL = 'ws://192.168.50.8:8765';
    private static readonly NUMPAD_KEYS: { [key: string]: string } = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        ".": ".",
        "/": "/",
        "*": "*",
        "-": "-",
        "+": "+",
        "Enter": "Enter",
        "Num Lock": "NumLock"
    };


    public static getInstance(): NumpadService {
        if (!NumpadService.instance) {
            NumpadService.instance = new NumpadService();
        }
        return NumpadService.instance;
    }

    private constructor() {
        this.webSocketHandler = new WebSocketHandler(NumpadService.WS_URL);
        this.setWebSocketHandlerCallbacks();
    }

    public onConnectionChange(callback: (isConnected: boolean) => void): void {
        this.connectionChangeCallback = callback;
    }

    public connect(): void {
        this.webSocketHandler.connect();
    }

    public disconnect(): void {
        this.webSocketHandler.disconnect();
    }

    public sendKeyPress(key: string): void {
        const mappedKey = NumpadService.NUMPAD_KEYS[key];
        if (mappedKey) {
            const message = JSON.stringify({ type: 'keypress', key: mappedKey });
            this.webSocketHandler.sendMessage(message);
        } else {
            console.warn(`Received unknown key: ${key}`);
        }
    }

    private setWebSocketHandlerCallbacks() {
        this.webSocketHandler.setCallback(WebSocketEvent.OPEN, () => {
            console.log('WebSocket connection opened');
            if (this.connectionChangeCallback) {
                this.connectionChangeCallback(true);
            }
        });

        this.webSocketHandler.setCallback(WebSocketEvent.CLOSE, () => {
            console.log('WebSocket connection closed');
            if (this.connectionChangeCallback) {
                this.connectionChangeCallback(false);
            }
        });

        this.webSocketHandler.setCallback(WebSocketEvent.ERROR, (error: any) => {
            console.error('WebSocket error:', error);
        });
    }
}

export default NumpadService.getInstance();
