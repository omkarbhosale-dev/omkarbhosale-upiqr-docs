import { generateQR, splitTransactionQR } from '@omkarbhosale/upiqr';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, params } = req.body;
    if (action === 'split') {
      const data = await splitTransactionQR(params);
      return res.status(200).json({ success: true, data });
    } else {
      const data = await generateQR(params);
      return res.status(200).json({ success: true, data });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message || 'Error generating QR' });
  }
}
