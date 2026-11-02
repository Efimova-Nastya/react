import useToggle from '../hooks/useToggle';

const faqItems = [
  { q: 'Как записаться на занятие?', a: 'Выберите лектора на странице «Лекторы», откройте его профиль и нажмите «Подробнее». Там вы найдёте тарифы и сможете записаться.' },
  { q: 'Какие форматы обучения доступны?', a: 'Мы предлагаем онлайн и оффлайн занятия, индивидуальные и групповые, а также интенсивы и корпоративные тренинги.' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, при отмене занятия не позднее чем за 24 часа до начала — возврат 100%.' },
  { q: 'Есть ли скидки?', a: 'Да, при покупке пакетов из 8 занятий действует скидка, а также есть специальные предложения для корпоративных клиентов.' },
  { q: 'Как стать лектором?', a: 'Напишите нам на info@info.ru с резюме и описанием ваших дисциплин.' }
];

function FaqItem({ item }) {
  const [isOpen, toggle] = useToggle();

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={toggle}>
        {item.q}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="faq-answer">{item.a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="page">
      <h1>Частые вопросы</h1>
      <div className="faq">
        {faqItems.map((item, i) => (
          <FaqItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
