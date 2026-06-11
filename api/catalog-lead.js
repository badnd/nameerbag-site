
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok:false, error:'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const company = String(body.company || '').trim();
    const products = String(body.products || '').trim();
    const website = String(body.website || '').trim(); // honeypot
    if (website) return res.status(200).json({ ok:true, sent:false, spam:true });
    if (!name || !email || !company || !products) return res.status(400).json({ ok:false, error:'Missing required fields' });

    const toEmail = process.env.LEAD_TO_EMAIL || '232119507@qq.com';
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.LEAD_FROM_EMAIL || 'Nameerbag Leads <onboarding@resend.dev>';
    const subject = `Catalog Download Lead - ${company}`;
    const html = `
      <h2>New Nameerbag catalog download lead</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company)}</p>
      <p><b>Interested Products:</b><br>${escapeHtml(products).replace(/\n/g,'<br>')}</p>
      <p><b>Page:</b> ${escapeHtml(req.headers.referer || '')}</p>
    `;

    if (!apiKey) {
      return res.status(200).json({ ok:true, sent:false, reason:'RESEND_API_KEY not configured', to: toEmail });
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: fromEmail, to: [toEmail], subject, html })
    });
    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ ok:false, sent:false, error:'Email provider error', detail });
    }
    return res.status(200).json({ ok:true, sent:true, to: toEmail });
  } catch (err) {
    return res.status(500).json({ ok:false, error: err.message });
  }
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
