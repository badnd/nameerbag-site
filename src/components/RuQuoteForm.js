'use client';

import { useState } from 'react';
import { siteData } from '@/data/site-data';

const sourceSite = 'nameerbag.com';

export function RuQuoteForm({ product = 'Сумки на заказ' }) {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const whatsappText = `Здравствуйте! Меня интересует проект: ${product}. Источник: ${sourceSite}`;
  const whatsapp = `https://wa.me/${siteData.company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_honey')) return;

    const details = [
      formData.get('details') ? `Описание проекта: ${formData.get('details')}` : '',
      formData.get('material') ? `Материал: ${formData.get('material')}` : '',
      formData.get('logo') ? `Логотип: ${formData.get('logo')}` : ''
    ].filter(Boolean).join('\n');

    const payload = new FormData();
    payload.set('name', formData.get('name') || '');
    payload.set('email', formData.get('email') || '');
    payload.set('product', formData.get('product') || product);
    payload.set('quantity', formData.get('quantity') || '');
    payload.set('message', details);
    payload.set('source_site', sourceSite);
    payload.set('_subject', `[${sourceSite}] Новый запрос - ${formData.get('product') || product}`);
    payload.set('_template', 'table');
    payload.set('_captcha', 'false');
    payload.set('_honey', '');

    setSending(true);
    setStatus('Отправляем запрос...');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteData.company.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== 'true') throw new Error('Submission failed');
      form.reset();
      setStatus('Спасибо! Мы ответим в течение 24 часов.');
    } catch {
      setStatus('Не удалось отправить форму. Свяжитесь с нами по WhatsApp или email.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="quote-card ru-quote-card">
      <div className="feature-item">
        <div className="icon-bubble">A</div>
        <div>
          <strong>Здравствуйте, я Anna Wei</strong>
          <div className="muted">Ваш консультант по производству сумок.</div>
          <div className="muted">Отправьте требования ниже, и я лично отвечу в течение 24 часов.</div>
        </div>
      </div>
      <form className="inquiry-form" onSubmit={onSubmit}>
        <input className="form-honey" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <label><span>Имя</span><input name="name" required autoComplete="name" /></label>
        <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
        <label><span>Интересующий товар</span><input name="product" defaultValue={product} required /></label>
        <label><span>Планируемое количество</span><input name="quantity" placeholder="50 / 100 / 300 / 500 / 1 000 / 3 000+ шт." required /></label>
        <label><span>Материал / ткань</span><input name="material" placeholder="Нужна рекомендация" /></label>
        <label><span>Способ нанесения логотипа</span><input name="logo" placeholder="Нужна рекомендация" /></label>
        <label><span>Описание проекта</span><textarea name="details" rows="4" placeholder="Опишите модель, размер, цвет, упаковку и целевой рынок." required /></label>
        <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Отправка...' : 'Отправить запрос'}</button>
        <a className="btn btn-secondary" href={whatsapp} target="_blank" rel="noopener">Написать в WhatsApp</a>
        <p className={status.startsWith('Спасибо') ? 'form-status success' : status.startsWith('Не удалось') ? 'form-status error' : 'form-status'} aria-live="polite">{status}</p>
      </form>
    </div>
  );
}
