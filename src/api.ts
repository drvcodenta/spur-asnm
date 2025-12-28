const API_BASE_URL = 'http://localhost:3001/';

export const chatAPI = {
    async sendMessage(message: string, sessionId?: string) {
        const response = await fetch(`${API_BASE_URL}/chat/message`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({message, sessionId})});
        return await response.json();
    }
}