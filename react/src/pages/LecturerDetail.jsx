import { useState } from 'react';
import { lecturers } from '../data/lecturers';
import Avatar from '../components/Avatar';
import EnrollModal from '../components/EnrollModal';
import useToggle from '../hooks/useToggle';

export default function LecturerDetail({ id, navigate }) {
  const lecturer = lecturers.find(l => l.id === id);
  const [tab, setTab] = useState('subjects');
  const [modalOpen, toggleModal] = useToggle();

  if (!lecturer) return <div className="page">Лектор не найден</div>;

  return (
    <div className="page">
      <button className="btn-outline" onClick={() => navigate('/lecturers')}>
        ← Назад
      </button>

      <div className="profile-header">
        <Avatar src={lecturer.photo} name={lecturer.name} />
        <div>
          <h1>{lecturer.name}</h1>
          <p className="degree">
            {lecturer.degree !== 'нет' ? lecturer.degree : 'Без степени'}
          </p>
          <p>Стаж: {lecturer.experience} лет</p>
          <p>{lecturer.education}</p>
          <button className="btn-primary btn-large" onClick={toggleModal}>
            Записаться
          </button>
        </div>
      </div>

      

      <div className="tabs">
        <button className={tab === 'subjects' ? 'active' : ''} onClick={() => setTab('subjects')}>Дисциплины</button>
        <button className={tab === 'pricing' ? 'active' : ''} onClick={() => setTab('pricing')}>Тарифы</button>
      </div>

      {tab === 'subjects' && (
        <div>
          {lecturer.subjects.map((s, i) => (
            <div key={i} className="subject-block">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ol>
                {s.topics.map((t, j) => <li key={j}>{t}</li>)}
              </ol>
            </div>
          ))}
        </div>
      )}

      {tab === 'pricing' && (
        <div className="tariffs">
          {lecturer.tariffs.map((t, i) => (
            <div key={i} className="tariff">
              <strong>{t.title}</strong>
              {t.duration && <span> ({t.duration})</span>}
              <div>{t.price.toLocaleString('ru-RU')} ₽</div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <EnrollModal
          onClose={toggleModal}
          title={lecturer.name}
        />
      )}
    </div>
  );
}