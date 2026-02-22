// Menyimpan riwayat percakapan (in-memory)
export const chatHistory = [];

export function addMessage(role, content) {
  chatHistory.push({ role, content });

  // Batasi memory (sesuai praktik modul)
  if (chatHistory.length > 10) {
    chatHistory.shift();
  }
}
