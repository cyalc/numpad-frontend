export enum WebSocketEvent {
    MESSAGE = 'message',
    ERROR = 'error',
    OPEN = 'open',
    CLOSE = 'close'
}

class WebSocketHandler {
    private socket: WebSocket | null = null;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    private callbacks: { [key: string]: Function } = {};

    setCallback(event: WebSocketEvent, callback: Function) {
        this.callbacks[event] = callback;
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('Connected to WebSocket server');
            if (this.callbacks[WebSocketEvent.OPEN]) {
                this.callbacks[WebSocketEvent.OPEN]();
            }
        };

        this.socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            if (this.callbacks[WebSocketEvent.CLOSE]) {
                this.callbacks[WebSocketEvent.CLOSE]();
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            if (this.callbacks[WebSocketEvent.ERROR]) {
                this.callbacks[WebSocketEvent.ERROR](error);
            }
        };

        this.socket.onmessage = (event) => {
            if (this.callbacks[WebSocketEvent.MESSAGE]) {
                this.callbacks[WebSocketEvent.MESSAGE](event.data);
            }
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    sendMessage(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.log('WebSocket is not connected');
        }
    }
}

export default WebSocketHandler;