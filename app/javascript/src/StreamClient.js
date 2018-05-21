export default class StreamClient {
    constructor(ip, callback) {
        this.ws = new WebSocket(`ws:${ip}:8080`);
        this.ws.binaryType = 'arraybuffer';
        let ws = this.ws;

        // Listen for messages
        ws.addEventListener('message', (event) => {
            event = this.read(event.data);
            callback(event)
        });
    }

    close() {
        this.ws.close();
    }

    read(m) {
        return JSON.parse(Buffer(m));
    }
}