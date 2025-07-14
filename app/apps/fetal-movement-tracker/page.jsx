"use client";
import { useState, useEffect } from "react";

const FetalMovementTracker = () => {
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [history, setHistory] = useState([]);

    // Загружаем историю и активный сеанс при запуске
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("fetalMovementsHistory") || "[]");
        setHistory(savedHistory);

        const savedSession = JSON.parse(localStorage.getItem("fetalCurrentSession") || "null");
        if (savedSession) {
            setCount(savedSession.count);
            setStartTime(savedSession.startTime);
        }
    }, []);

    // Сохраняем активный сеанс в localStorage
    useEffect(() => {
        if (startTime) {
            localStorage.setItem("fetalCurrentSession", JSON.stringify({ count, startTime }));
        }
    }, [count, startTime]);

    // Таймер для отображения длительности
    useEffect(() => {
        let timer;
        if (startTime) {
            timer = setInterval(() => {
                setElapsed(Math.floor((Date.now() - startTime) / 1000 / 60)); // в минутах
            }, 60000);
        }
        return () => clearInterval(timer);
    }, [startTime]);

    const recordMovement = () => {
        if (!startTime) {
            setStartTime(Date.now());
        }
        setCount(count + 1);
    };

    const resetSession = () => {
        const session = {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            movements: count,
            duration: elapsed
        };
        const newHistory = [session, ...history];
        setHistory(newHistory);
        localStorage.setItem("fetalMovementsHistory", JSON.stringify(newHistory));

        setCount(0);
        setStartTime(null);
        setElapsed(0);
        localStorage.removeItem("fetalCurrentSession");
    };

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow" data-aos="fade-up">
            <h1 className="text-center mb-4">Калькулятор шевелений плода</h1>
            <p className="text-center text-muted mb-5">
                Отмечайте каждое шевеление малыша. Цель — 10 шевелений в течение 2 часов.
            </p>

            <div className="text-center mb-5">
                <button
                    onClick={recordMovement}
                    className="btn btn-success rounded-4 px-4 py-2 fs-5 fw-bold"
                >
                    ➕ Записать шевеление
                </button>
                <p className="mt-4 fs-4 fw-bold">{count} / 10 шевелений</p>
                {startTime && (
                    <p className="text-muted small">
                        Время сеанса: {elapsed} мин.
                    </p>
                )}
                {count >= 10 && (
                    <p className="text-success fw-bold mt-3">Отлично! Малыш активен.</p>
                )}
            </div>

            {startTime && (
                <div className="text-center mb-5">
                    <button
                        onClick={resetSession}
                        className="btn btn-outline-secondary rounded-4"
                    >
                        Сохранить сеанс
                    </button>
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-5 pt-5 border-top">
                    <h5>История сеансов</h5>
                    <ul className="list-group mt-3">
                        {history.map((session, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{session.date}</strong> в {session.time}
                                    <br />
                                    {session.movements} шевелений за {session.duration} мин.
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => {
                            localStorage.removeItem("fetalMovementsHistory");
                            setHistory([]);
                        }}
                        className="btn btn-sm btn-outline-danger mt-3 rounded-4"
                    >
                        Очистить историю
                    </button>
                </div>
            )}
        </div>
    );
};

export default FetalMovementTracker;