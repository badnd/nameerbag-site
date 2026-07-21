const imageRoot = (model) => `assets/products/${model.toLowerCase()}`;

const inquiry = (logoMethods) => ({
  moq: 'Minimum Order Quantity: from 50 pcs*',
  sampling: 'Sampling: 7–15 days',
  bulk: 'Bulk production: 15–30 days',
  sampleFee: 'Sample fee: 1,000+ refundable · 500–1,000 negotiable',
  logoMethods: `Logo methods: ${logoMethods}`,
  pricing: 'Pricing: Contact us for best price — inquiry only, no fixed list price.',
  services: 'OEM / ODM · Private Label · Wholesale welcome.',
  note: '* Final MOQ depends on style, fabric and logo method. Anna will confirm in your quotation.'
});

const ruInquiry = (logoMethods) => ({
  moq: 'Минимальный заказ: от 50 шт*',
  sampling: 'Изготовление образца: 7–15 дней',
  bulk: 'Серийное производство: 15–30 дней',
  sampleFee: 'Стоимость образца: возврат при заказе 1 000+ шт · обсуждается при 500–1 000 шт',
  logoMethods: `Способы нанесения логотипа: ${logoMethods}`,
  pricing: 'Цена: запросите лучший расчёт — только по запросу, без фиксированного прайс-листа.',
  services: 'OEM / ODM · Private Label · Оптовые заказы приветствуются.',
  note: '* Итоговый MOQ зависит от модели, ткани и способа нанесения логотипа. Анна подтвердит его в предложении.'
});

export const nameerCrossbodyBatch = {
  'reflective-crossbody-phone-pouch-ytljy5626': {
    category: 'Mini Crossbody Bags',
    categorySlug: 'mini-crossbody',
    title: 'Reflective Crossbody Phone Pouch — YTLJY5626',
    tagline: 'Visible, lightweight, everyday. Day-to-night carry that keeps you seen.',
    metaTitle: 'Reflective Crossbody Phone Pouch YTLJY5626 | Nameer',
    metaDescription: 'Reflective nylon crossbody phone pouch YTLJY5626 for OEM/ODM orders. Front zipper, back slip pocket, custom colors and logo options.',
    schemaDescription: 'A compact reflective nylon crossbody phone pouch with front zipper pocket, back slip pocket and custom branding options.',
    model: 'YTLJY5626',
    hero: `${imageRoot('ytljy5626')}/739e54be-1668-4e83-8c1e-487528077264.webp`,
    gallery: [
      `${imageRoot('ytljy5626')}/739e54be-1668-4e83-8c1e-487528077264.webp`,
      `${imageRoot('ytljy5626')}/031ef273-808d-46c6-9bff-877257356c33.webp`,
      `${imageRoot('ytljy5626')}/c1077415-f7e5-475b-a03c-a2e457ee660f.webp`,
      `${imageRoot('ytljy5626')}/d0bafa14-25d3-40af-ae10-4912a1e8a3ef.webp`,
      `${imageRoot('ytljy5626')}/ecd21838-ffe8-4389-b573-a1457aca1ce9.webp`
    ],
    galleryAlt: [
      'YTLJY5626 reflective crossbody phone pouch worn at night',
      'YTLJY5626 reflective phone pouch product overview',
      'YTLJY5626 phone pouch capacity and fit display',
      'YTLJY5626 dimensions and product information',
      'YTLJY5626 zipper pockets strap and reflective fabric details'
    ],
    badges: ['Reflective Nylon', 'Lightweight', 'Custom Logo', 'OEM / ODM'],
    intro: 'A compact reflective phone pouch built for daily carry. The reflective fabric lifts your visibility at night while a smart, slim design keeps your phone, cards and keys secure and easy to reach — ideal for travel, events, city commutes and active evenings.',
    specs: [
      ['Model', 'YTLJY5626'], ['Type', 'Reflective Crossbody Phone Pouch'], ['Dimensions', '13 × 2 × 18 cm'],
      ['Material', 'Nylon (reflective)'], ['Weight', 'Approx. 0.10 kg'], ['Carry', 'Crossbody / Neck Pouch'], ['Fits', 'Most smartphones']
    ],
    features: ['Reflective fabric for low-light visibility', 'Front zipper pocket', 'Back slip pocket', 'Lightweight & slim', 'Durable rope strap', 'Roomy main compartment'],
    colors: 'Multiple color options (reflective + custom colors available)',
    logoMethods: 'Screen print · Heat transfer · Woven label · Custom packaging',
    inquiry: inquiry('Screen print · Heat transfer · Woven label · Custom packaging'),
    variants: [],
    ru: {
      title: 'Светоотражающий чехол для телефона через плечо — YTLJY5626',
      tagline: 'Заметный, лёгкий, повседневный. Для безопасного ношения днём и вечером.',
      metaTitle: 'Светоотражающий чехол для телефона YTLJY5626 | Nameer',
      metaDescription: 'Светоотражающий нейлоновый чехол YTLJY5626 для OEM/ODM: передний карман на молнии, задний карман, цвета и логотип на заказ.',
      intro: 'Компактный светоотражающий чехол для телефона, рассчитанный на повседневное ношение. Ткань повышает заметность в темноте, а тонкая конструкция помогает безопасно и удобно хранить телефон, карты и ключи во время поездок, мероприятий и вечерних прогулок.',
      specs: [['Модель', 'YTLJY5626'], ['Тип', 'Светоотражающий чехол для телефона через плечо'], ['Размеры', '13 × 2 × 18 см'], ['Материал', 'Нейлон (светоотражающий)'], ['Вес', 'Около 0,10 кг'], ['Способ ношения', 'Через плечо / на шее'], ['Вместимость', 'Большинство смартфонов']],
      features: ['Светоотражающая ткань для заметности при слабом освещении', 'Передний карман на молнии', 'Задний открытый карман', 'Лёгкая и тонкая конструкция', 'Прочный шнуровой ремень', 'Вместительное основное отделение'],
      colors: 'Несколько вариантов цвета (светоотражающие и индивидуальные цвета)',
      logoMethods: 'Шелкография · Термотрансфер · Тканая этикетка · Упаковка на заказ',
      inquiry: ruInquiry('шелкография · термотрансфер · тканая этикетка · упаковка на заказ')
    }
  },
  'reflective-crossbody-phone-pouch-slim-ytljy8090a': {
    category: 'Mini Crossbody Bags', categorySlug: 'mini-crossbody',
    title: 'Reflective Crossbody Phone Pouch — YTLJY8090A',
    tagline: 'High visibility at night. Style, safety, function in one slim pouch.',
    metaTitle: 'Slim Reflective Phone Pouch YTLJY8090A | Nameer',
    metaDescription: 'Ultra-light reflective phone pouch YTLJY8090A with snap flap and adjustable strap for OEM/ODM, private label and custom packaging.',
    schemaDescription: 'A slim ultra-light reflective nylon phone pouch with snap-button flap, adjustable strap and OEM/ODM branding options.',
    model: 'YTLJY8090A',
    hero: `${imageRoot('ytljy8090a')}/61fa6cd7-bfcd-4046-a913-a7de8432237d.webp`,
    gallery: [
      `${imageRoot('ytljy8090a')}/61fa6cd7-bfcd-4046-a913-a7de8432237d.webp`,
      `${imageRoot('ytljy8090a')}/2dbb5759-00c2-4bca-928f-b0aebfef782b.webp`,
      `${imageRoot('ytljy8090a')}/5b53335c-747f-4561-a686-e91820444aba.webp`,
      `${imageRoot('ytljy8090a')}/5be47e21-7b9b-41af-99db-d848570d6280.webp`,
      `${imageRoot('ytljy8090a')}/9a388873-a1bc-4c46-9841-075650df4942.webp`
    ],
    galleryAlt: ['YTLJY8090A slim reflective phone pouch worn crossbody', 'YTLJY8090A snap flap strap and detail display', 'YTLJY8090A product overview and logo position', 'YTLJY8090A reflective pouch night lifestyle display', 'YTLJY8090A dimensions and capacity display'],
    badges: ['Reflective Nylon', 'Ultra-light', 'Snap Flap', 'Private Label'],
    intro: 'A slimmer, ultra-light reflective phone pouch with a secure snap-button flap. At just 0.06 kg it disappears against you, while the reflective nylon catches light for safety after dark — made for events, travel and everyday city carry. A more minimal, taller companion to the YTLJY5626.',
    specs: [['Model', 'YTLJY8090A'], ['Type', 'Reflective Crossbody / Shoulder Pouch'], ['Dimensions', '12 × 3.5 × 20 cm'], ['Material', 'Reflective Nylon'], ['Weight', 'Approx. 0.06 kg'], ['Carry', 'Crossbody / Shoulder'], ['Color', 'Reflective Blue (custom colors available)']],
    features: ['Reflective & eye-catching nylon', 'Secure snap-button closure', 'Adjustable strap', 'Lightweight & compact', 'Fits most smartphones & small essentials', 'Spacious main compartment'],
    colors: 'Reflective Blue + custom colors available',
    logoMethods: 'OEM/ODM · Private label · Custom logo & packaging',
    inquiry: inquiry('OEM/ODM · Private label · Custom logo & packaging'), variants: [],
    ru: {
      title: 'Тонкий светоотражающий чехол для телефона — YTLJY8090A',
      tagline: 'Высокая заметность ночью. Стиль, безопасность и функция в одном тонком чехле.',
      metaTitle: 'Тонкий светоотражающий чехол YTLJY8090A | Nameer',
      metaDescription: 'Ультралёгкий светоотражающий чехол YTLJY8090A с клапаном на кнопке и регулируемым ремнём для OEM/ODM и private label.',
      intro: 'Более тонкий и ультралёгкий светоотражающий чехол для телефона с надёжным клапаном на кнопке. При весе всего 0,06 кг он почти не ощущается, а светоотражающий нейлон помогает быть заметнее после наступления темноты. Более минималистичная и высокая модель по сравнению с YTLJY5626.',
      specs: [['Модель', 'YTLJY8090A'], ['Тип', 'Светоотражающий чехол через плечо'], ['Размеры', '12 × 3,5 × 20 см'], ['Материал', 'Светоотражающий нейлон'], ['Вес', 'Около 0,06 кг'], ['Способ ношения', 'Через плечо'], ['Цвет', 'Светоотражающий синий (доступны цвета на заказ)']],
      features: ['Яркий светоотражающий нейлон', 'Надёжный клапан на кнопке', 'Регулируемый ремень', 'Лёгкая компактная конструкция', 'Подходит для большинства смартфонов и мелочей', 'Вместительное основное отделение'],
      colors: 'Светоотражающий синий и индивидуальные цвета', logoMethods: 'OEM/ODM · Private label · Логотип и упаковка на заказ', inquiry: ruInquiry('OEM/ODM · private label · логотип и упаковка на заказ')
    }
  },
  'lightweight-crossbody-bag-ytljy5633': {
    category: 'Mini Crossbody Bags', categorySlug: 'mini-crossbody',
    title: 'Lightweight Crossbody Bag — YTLJY5633', tagline: 'Minimalist design, built for everyday carry.',
    metaTitle: 'Lightweight Crossbody Bag YTLJY5633 | Nameer',
    metaDescription: 'Water-resistant nylon crossbody bag YTLJY5633 with front zipper, inner pocket and detachable hook for OEM/ODM and private label orders.',
    schemaDescription: 'A lightweight water-resistant nylon crossbody bag with organized pockets, adjustable strap and custom branding options.', model: 'YTLJY5633',
    hero: `${imageRoot('ytljy5633')}/3c1dd2aa-cd11-4582-b51e-7d0dbcb6881e.webp`,
    gallery: [
      `${imageRoot('ytljy5633')}/3c1dd2aa-cd11-4582-b51e-7d0dbcb6881e.webp`, `${imageRoot('ytljy5633')}/41ab56cc-11e2-4d43-ba30-31bef166e603.webp`,
      `${imageRoot('ytljy5633')}/617e85d7-b2fa-45d5-bbf8-4b70d4b7fcc1.webp`, `${imageRoot('ytljy5633')}/8a01e030-b616-4e29-95e4-164ba4ad0c2f.webp`,
      `${imageRoot('ytljy5633')}/bd585df5-4846-47c6-94bc-e1e2f30f12ac.webp`, `${imageRoot('ytljy5633')}/e4496a33-4abf-43b9-a4d6-1dc4724744d6.webp`
    ],
    galleryAlt: ['YTLJY5633 lightweight crossbody bag worn by a model', 'YTLJY5633 black cream lime and orange color options', 'YTLJY5633 front side and back product views', 'YTLJY5633 logo customization methods', 'YTLJY5633 zipper hook and pocket details', 'YTLJY5633 organized capacity display'],
    badges: ['Water-resistant', 'Lightweight', 'Multi-pocket', 'Custom Branding'],
    intro: 'A clean, lightweight crossbody in water-resistant nylon, sized for everyday essentials without the bulk. A front zipper pocket, roomy main compartment and inner pocket keep phone, passport, cards and cosmetics organized, while the adjustable strap and detachable shoulder hook make it easy to wear your way.',
    specs: [['Model', 'YTLJY5633'], ['Type', 'Lightweight Crossbody Bag'], ['Dimensions', '17 × 3 × 12 cm'], ['Material', 'Water-Resistant Nylon'], ['Weight', '0.08 kg'], ['Carry', 'Shoulder / Crossbody'], ['Structure', 'Main compartment / front zipper pocket / inner pocket']],
    features: ['Water-resistant nylon', 'Smooth zipper', 'Front zipper pocket', 'Detachable shoulder hook', 'Adjustable strap', 'Internal slip pocket', 'Reinforced stress points'],
    colors: 'Black · Cream White · Lime Green · Orange Brown', logoMethods: 'Front print · Rubber patch · Woven label · Custom zipper pull · Hangtag', inquiry: inquiry('Front print · Rubber patch · Woven label · Custom zipper pull · Hangtag'), variants: [],
    ru: {
      title: 'Лёгкая сумка через плечо — YTLJY5633', tagline: 'Минималистичный дизайн для повседневного ношения.',
      metaTitle: 'Лёгкая сумка через плечо YTLJY5633 | Nameer', metaDescription: 'Водоотталкивающая нейлоновая сумка YTLJY5633 с карманами и съёмным крючком для OEM/ODM и private label заказов.',
      intro: 'Чистая и лёгкая сумка через плечо из водоотталкивающего нейлона для повседневных вещей без лишнего объёма. Передний карман на молнии, основное отделение и внутренний карман помогают разложить телефон, паспорт, карты и косметику, а регулируемый ремень и съёмный крючок дают несколько вариантов ношения.',
      specs: [['Модель', 'YTLJY5633'], ['Тип', 'Лёгкая сумка через плечо'], ['Размеры', '17 × 3 × 12 см'], ['Материал', 'Водоотталкивающий нейлон'], ['Вес', '0,08 кг'], ['Способ ношения', 'На плече / через плечо'], ['Конструкция', 'Основное отделение / передний карман на молнии / внутренний карман']],
      features: ['Водоотталкивающий нейлон', 'Плавная молния', 'Передний карман на молнии', 'Съёмный плечевой крючок', 'Регулируемый ремень', 'Внутренний открытый карман', 'Усиленные точки нагрузки'],
      colors: 'Чёрный · Кремово-белый · Лаймово-зелёный · Оранжево-коричневый', logoMethods: 'Фронтальная печать · Резиновый патч · Тканая этикетка · Пуллер на заказ · Бирка', inquiry: ruInquiry('фронтальная печать · резиновый патч · тканая этикетка · пуллер на заказ · бирка')
    }
  },
  'ripstop-nylon-mini-crossbody-bag-ytljy5642': {
    category: 'Mini Crossbody Bags', categorySlug: 'mini-crossbody',
    title: 'Ripstop Nylon Mini Crossbody Bag — YTLJY5642', tagline: 'Large capacity in a compact size. Small bag, big utility.',
    metaTitle: 'Ripstop Nylon Mini Crossbody Bag YTLJY5642 | Nameer',
    metaDescription: 'Ripstop nylon mini crossbody bag YTLJY5642 with organized pockets, adjustable strap and custom logo options for OEM/ODM buyers.',
    schemaDescription: 'A compact water-resistant ripstop nylon crossbody bag with multiple pockets, adjustable strap and custom branding options.', model: 'YTLJY5642',
    hero: `${imageRoot('ytljy5642')}/d6011d8f-9381-4dec-9ab5-984a636306fc.webp`,
    gallery: [
      `${imageRoot('ytljy5642')}/d6011d8f-9381-4dec-9ab5-984a636306fc.webp`, `${imageRoot('ytljy5642')}/23cd6635-a7fd-437d-a22f-f44e87b89117.webp`,
      `${imageRoot('ytljy5642')}/61270878-11dc-48b3-8b27-919ee1fc5b2a.webp`, `${imageRoot('ytljy5642')}/62516160-b3e0-4c1f-af71-21e2ffa64c25.webp`,
      `${imageRoot('ytljy5642')}/a513d8ef-ecb3-475b-b117-f8d6916d41b4.webp`, `${imageRoot('ytljy5642')}/f9eada4a-44c0-4a44-88e0-6978f6ed48d9.webp`
    ],
    galleryAlt: ['YTLJY5642 mini crossbody bag worn in an urban setting', 'YTLJY5642 black grey and green color options', 'YTLJY5642 capacity display with daily essentials', 'YTLJY5642 dimensions material and product specifications', 'YTLJY5642 zipper hardware pockets and strap details', 'YTLJY5642 compact product views and logo options'],
    badges: ['Ripstop Nylon', 'Water-resistant', 'Multi-pocket', 'Urban Style'],
    intro: 'A mini crossbody in durable water-resistant ripstop nylon, designed for city life. Despite the compact footprint it swallows daily essentials — phone, power bank, cards and keys — across a front zip pocket, main compartment, inner slip pocket and back slip pocket, all on an adjustable shoulder strap.',
    specs: [['Model', 'YTLJY5642'], ['Type', 'Mini Crossbody Bag'], ['Dimensions', '18 × 4 × 15 cm'], ['Material', 'Ripstop Nylon'], ['Lining', 'Polyester'], ['Weight', '0.09 kg'], ['Structure', 'Front zipper pocket / main compartment / inner slip pocket / back slip pocket'], ['Strap', 'Adjustable shoulder strap']],
    features: ['Water-resistant ripstop nylon', 'Smooth zipper', 'Durable hardware & hook', 'Adjustable strap', 'Multiple pockets', 'Organized interior', 'Urban, versatile style'],
    colors: 'Black · Grey · Green', logoMethods: 'Front print · Rubber patch · Woven label · Rubber badge · Custom packaging', inquiry: inquiry('Front print · Rubber patch · Woven label · Rubber badge · Custom packaging'), variants: [],
    ru: {
      title: 'Мини-сумка через плечо из ripstop-нейлона — YTLJY5642', tagline: 'Большая вместимость в компактном формате. Маленькая сумка, много пользы.',
      metaTitle: 'Мини-сумка из ripstop-нейлона YTLJY5642 | Nameer', metaDescription: 'Мини-сумка YTLJY5642 из ripstop-нейлона с несколькими карманами, регулируемым ремнём и логотипом на заказ для OEM/ODM.',
      intro: 'Мини-сумка через плечо из прочного водоотталкивающего ripstop-нейлона для городской жизни. При компактных размерах она вмещает телефон, пауэрбанк, карты и ключи: предусмотрены передний карман на молнии, основное отделение, внутренний и задний открытые карманы, а также регулируемый плечевой ремень.',
      specs: [['Модель', 'YTLJY5642'], ['Тип', 'Мини-сумка через плечо'], ['Размеры', '18 × 4 × 15 см'], ['Материал', 'Ripstop-нейлон'], ['Подкладка', 'Полиэстер'], ['Вес', '0,09 кг'], ['Конструкция', 'Передний карман на молнии / основное отделение / внутренний и задний открытые карманы'], ['Ремень', 'Регулируемый плечевой ремень']],
      features: ['Водоотталкивающий ripstop-нейлон', 'Плавная молния', 'Прочная фурнитура и крючок', 'Регулируемый ремень', 'Несколько карманов', 'Организованное внутреннее пространство', 'Универсальный городской стиль'],
      colors: 'Чёрный · Серый · Зелёный', logoMethods: 'Фронтальная печать · Резиновый патч · Тканая этикетка · Резиновый шеврон · Упаковка на заказ', inquiry: ruInquiry('фронтальная печать · резиновый патч · тканая этикетка · резиновый шеврон · упаковка на заказ')
    }
  }
};
