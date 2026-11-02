import { lecturers } from '../data/lecturers';
import EnrollModal from '../components/EnrollModal';
import useToggle from '../hooks/useToggle';

export default function CourseDetail({ id, navigate }) {
  const [modalOpen, toggleModal] = useToggle();
  let course = null;
  let lecturer = null;

  for (const l of lecturers) {
    const found = l.subjects.find(s => s.id === id);
    if (found) {
      course = found;
      lecturer = l;
      break;
    }
  }

  if (!course) return <div className="page">Курс не найден</div>;

  return (
    <div className="page">


      <h1>{course.title}</h1>
      <p className="course-desc">{course.description}</p>

      <p>
        Преподаватель:{' '}
        <a
          href={`/lecturers/${lecturer.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/lecturers/${lecturer.id}`);
          }}
        >
          {lecturer.name}
        </a>
      </p>

      <h2>Программа курса</h2>
      <ol className="topics-list">
        {course.topics.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>

      <h2>Стоимость</h2>
      <div className="tariffs">
        {lecturer.tariffs.map((t, i) => (
          <div key={i} className="tariff">
            <strong>{t.title}</strong>
            {t.duration && <span> ({t.duration})</span>}
            <div>{t.price.toLocaleString('ru-RU')} ₽</div>
          </div>
        ))}
      </div>

      <button className="btn-primary btn-large" onClick={toggleModal}>
        Записаться на курс
      </button>

      {modalOpen && (
        <EnrollModal
          onClose={toggleModal}
          title={course.title}
        />
      )}

    </div>
  );
}