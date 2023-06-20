import './App.css';
import Line from './components/Line/Line';
import { useState } from 'react';

const colors = ['#E46969', '#4AC8A2'];

function App() {
  // таймер
  const [timer, setTimer] = useState({
    isRuning: false,
    timerID: null,
  });
  // время таймера
  const [timerCount, setTimerCount] = useState(0);
  // состояния событий
  const [s1, setS1] = useState({
    name: 'Событие 1',
    isRuning: false,
    start: 0,
    end: 0,
    timerID: null,
  });

  const [s2, setS2] = useState({
    name: 'Событие 2',
    isRuning: false,
    start: 0,
    end: 0,
    timerID: null,
  });

  // Темпоральные отношения
  const [temporal1, setTemporal1] = useState('');
  const [temporal2, setTemporal2] = useState('');

  // запуск/остановка события
  const initProccess = (process) => {
    // ф-я обновления состояния
    let setter = null;

    // определение ф-и обновления состояния
    if (process.name === 'Событие 1') {
      setter = setS1;
    } else {
      setter = setS2;
    }

    if (!process.isRuning) {
      console.log(`Запуск ${process.name}`);

      const start = timerCount;

      setter({ ...process, isRuning: true, start: start, end: 0 });

      const timer = setInterval(() => {
        setter((s) => {
          return {
            ...s,
            end: s.end + 1,
            timerID: timer,
          };
        });
      }, 1000);
    } else {
      clearInterval(process.timerID);
      setter((s) => {
        return {
          ...s,
          isRuning: false,
          timerID: null,
        };
      });
    }
  };
  // убрать все счетчики времени
  const clearAllIntervals = () => {
    clearInterval(s1.timerID);
    clearInterval(s2.timerID);
  };

  // Таймер
  const init = () => {
    if (!timer.isRuning) {
      const timer = setInterval(() => {
        setTimerCount((t) => t + 1);
      }, 1000);
      setTimer({ isRuning: true, timerID: timer });
    } else {
      clearInterval(timer.timerID);
      setTimer({ isRuning: false, timerID: null });
      setTimerCount(0);
      clearAllIntervals();
      getTempRels();
    }
  };
  // сравнение темпоральных отношений
  const compareTwoProcess = (p1, p2) => {
    const durationProcess1 = p1.start + p1.end;
    const durationProcess2 = p2.start + p2.end;

    if (p1.start === p2.start) {
      return `${p1.name} - ${p2.name} : вложенные с примыканием к началу`;
    } else if (durationProcess1 === durationProcess2) {
      return `${p1.name} - ${p2.name} : вложенные с примыканием к концу`;
    } else if (durationProcess1 === p2.start || durationProcess2 === p1.start) {
      return `${p1.name} - ${p2.name} : последовательные без паузы`;
    } else if (durationProcess1 < p2.start) {
      return `${p1.name} - ${p2.name} : последовательные с паузой`;
    } else if (p1.start > p2.start && durationProcess1 < durationProcess2) {
      return `${p1.name} - ${p2.name} : вложенные без примыканий`;
    } else if (p1.start > p2.start && durationProcess1 > durationProcess2) {
      return `${p1.name} - ${p2.name} : пересекаются`;
    }
  };
  // получение темпоральных отношений
  const getTempRels = () => {
    setTemporal1(compareTwoProcess(s1, s2));
    setTemporal2(compareTwoProcess(s2, s1));
  };

  return (
    <div className="App">
      <div className="lineList">
        <Line
          key={s1.name}
          startPoint={s1.start}
          endPoint={s1.end}
          color={colors[0]}
        />
        <Line
          key={s2.name}
          startPoint={s2.start}
          endPoint={s2.end}
          color={colors[1]}
        />
      </div>
      <div className="sidebar">
        <div className="contorls">
          <button
            className="button"
            style={{ background: timer.isRuning ? '#e07d6b' : '#75e06b' }}
            onClick={init}
          >
            {timer.isRuning ? 'Stop' : 'Start'}
          </button>
          <p>Время {timerCount} секунд</p>
          <div className="process-button-list">
            <button
              className="button"
              style={{ background: s1.isRuning ? '#e07d6b' : '#75e06b' }}
              onClick={() => {
                initProccess(s1);
              }}
              disabled={!timer.isRuning ? true : false}
            >
              Событие 1 {!s1.isRuning ? 'начать' : 'закончить'}
            </button>
            <button
              className="button"
              style={{ background: s2.isRuning ? '#e07d6b' : '#75e06b' }}
              onClick={() => {
                initProccess(s2);
              }}
              disabled={!timer.isRuning ? true : false}
            >
              Событие 2 {!s2.isRuning ? 'начать' : 'закончить'}
            </button>
          </div>
        </div>
        <ul className="legend">
          {[1, 1].map((item, index) => (
            <li key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ background: colors[index] }}
              />
              <span>Событие {index + 1}</span>
            </li>
          ))}
        </ul>
        <div className="temporal-rels">
          <h2>Темпоральные отношения</h2>
          <p>{temporal1}</p>
          <p>{temporal2}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
