export function connectWebSocket(onMessageCallback) {
  const socket = new WebSocket("ws://localhost:3001/socket"); // Sesuaikan URL WebSocket

  socket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  socket.onmessage = (event) => {
    onMessageCallback(event.data); // Menangani pesan WebSocket
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error: ", error);
  };

  return socket;
}
