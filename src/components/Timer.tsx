import React, { FC, useState, useRef, useEffect } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;

}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  // Сохраняем в useRef сам таймер
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  // Как только поменялся игрок, стартуем таймер
  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Чёрные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  )
}

export default Timer;
