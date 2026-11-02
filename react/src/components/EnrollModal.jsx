import { useEffect, useState } from 'react';

export default function EnrollModal({ onClose, title }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <h2>Запись на курс</h2>
        <p className="modal-subtitle">{title}</p>
        {sent ? (
          <>
            <p className="success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
            <button className="btn-primary" onClick={onClose}>Закрыть</button>
          </>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Ваше имя" required />
            <input type="tel" placeholder="Телефон" required />
            <button type="submit" className="btn-primary">Отправить заявку</button>
          </form>
        )}
      </div>
    </div>
  );
}
