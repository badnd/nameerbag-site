import { siteData } from '@/data/site-data';

const whatsappText = 'Здравствуйте! Меня интересуют ваши сумки на заказ. Пришлите, пожалуйста, каталог, уровни MOQ, стоимость образца и сроки. — Anna Wei, Sales';

export function RuQuoteForm({ product = 'Сумки на заказ' }) {
  const whatsapp = `https://wa.me/${siteData.company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="quote-card ru-quote-card">
      <div className="feature-item">
        <div className="icon-bubble">A</div>
        <div>
          <strong>Здравствуйте, я Anna Wei 👋</strong>
          <div className="muted">ваш консультант по производству сумок.</div>
          <div className="muted">Отправьте ваши требования ниже, и я лично отвечу в течение 24 часов с предложениями по MOQ, образцам и ценам.</div>
        </div>
      </div>
      <form className="inquiry-form">
        <label>
          <span>Интересующий товар</span>
          <input name="product" defaultValue={product} />
        </label>
        <label>
          <span>Планируемое количество</span>
          <input name="quantity" placeholder="50 / 100 / 300 / 500 / 1 000 / 3 000+ шт" />
        </label>
        <label>
          <span>Материал / Ткань</span>
          <input name="material" placeholder="Нужна рекомендация" />
        </label>
        <label>
          <span>Способ нанесения логотипа</span>
          <input name="logo" placeholder="Нужна рекомендация" />
        </label>
        <label>
          <span>Email / WhatsApp</span>
          <input name="contact" placeholder={siteData.company.email} />
        </label>
        <label>
          <span>Комментарий</span>
          <textarea name="message" rows="4" placeholder="Опишите модель, размер, цвет, упаковку и целевой рынок." />
        </label>
        <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noopener">Отправить запрос</a>
      </form>
    </div>
  );
}
