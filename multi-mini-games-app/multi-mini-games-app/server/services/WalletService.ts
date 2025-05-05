const API_BASE = 'http://localhost:3000'; // or your ngrok/Firebase endpoint

export const getWallet = async (userId: string) => {
  const res = await fetch(`${API_BASE}/wallet/${userId}`);
  if (!res.ok) throw new Error('Failed to load wallet');
  return await res.json();
};

export const updateWallet = async (userId: string, amount: number) => {
  const res = await fetch(`${API_BASE}/wallet/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error('Failed to update wallet');
};
