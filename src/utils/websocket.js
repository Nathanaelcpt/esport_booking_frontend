export function connectWebSocket(onMessage) {
  const socket = new WebSocket(process.env.REACT_APP_WS_URL);

  socket.onmessage = (event) => {
    onMessage(event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
}
