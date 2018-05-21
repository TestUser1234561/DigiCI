export default class StreamClient {
    constructor() {
        this.events = {};
        this.start();
    }

    //Event binder
    on(event, fn) {
        this.events[event] = fn;
    }

    start() {
        this.ws = new WebSocket('ws:localhost:8080');
        this.ws.binaryType = 'arraybuffer';
        let ws = this.ws;

        // Listen for messages
        ws.addEventListener('message', (event) => {
            event = this.read(event.data);
            console.log(event);
            if(typeof this.events[event.type] === "function") { this.events[event.type](event) }
        });

        //Attempt reconnect on close
        ws.addEventListener('close', () => {
            setTimeout(() => {
                this.start();
            }, 5000)
        });
    }

    send(m) {
        this.ws.send(Buffer.from(JSON.stringify(m)));
    }

    read(m) {
        return JSON.parse(Buffer(m));
    }
}