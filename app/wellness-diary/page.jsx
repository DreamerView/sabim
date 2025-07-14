"use client";
import { useState, useEffect } from "react";

const WellnessDiary = () => {
    const [weekInput, setWeekInput] = useState('');
    const [entryInput, setEntryInput] = useState({
        headache: false,
        nausea: false,
        fatigue: false,
        mood: ''
    });
    const [entries, setEntries] = useState([]);

    // Загрузка из localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sabim_wellness_data");
        if (saved) setEntries(JSON.parse(saved));
    }, []);

    // Сохранение
    useEffect(() => {
        localStorage.setItem("sabim_wellness_data", JSON.stringify(entries));
    }, [entries]);

    const addEntry = (e) => {
        e.preventDefault();
        if (!weekInput) return;

        const newEntry = {
            week: parseInt(weekInput),
            ...entryInput
        };

        setEntries(prev => [...prev.filter(e => e.week !== newEntry.week), newEntry].sort((a, b) => a.week - b.week));
        setWeekInput('');
        setEntryInput({ headache: false, nausea: false, fatigue: false, mood: '' });
    };

    const deleteEntry = (week) => {
        setEntries(prev => prev.filter(e => e.week !== week));
    };

    const resetAll = () => {
        if (confirm("Удалить все записи?")) {
            setEntries([]);
            localStorage.removeItem("sabim_wellness_data");
        }
    };

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow">
            <h1 className="text-center mb-4">Дневник самочувствия</h1>
            <p className="text-center mx-auto mb-5 text-muted" style={{ maxWidth: 600 }}>
                Отмечайте самочувствие каждую неделю, чтобы отслеживать своё состояние.
            </p>

            {/* Форма */}
            <form onSubmit={addEntry} className="row mx-auto mb-4" style={{ maxWidth: 500 }}>
                <div className="col-4">
                    <input
                        type="number"
                        min="0"
                        max="40"
                        placeholder="Неделя"
                        value={weekInput}
                        onChange={e => setWeekInput(e.target.value)}
                        className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5 mb-3"
                        required
                    />
                </div>
                <div className="col-8 d-flex justify-content-end">
                    <button type="submit" className="btn btn-danger rounded-4 fw-bold px-4 fs-5">
                        Добавить
                    </button>
                </div>

                <div className="col-12 mt-4">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={entryInput.headache}
                            onChange={e => setEntryInput({ ...entryInput, headache: e.target.checked })}
                            id="headacheCheck"
                        />
                        <label className="form-check-label" htmlFor="headacheCheck">
                            Головная боль
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={entryInput.nausea}
                            onChange={e => setEntryInput({ ...entryInput, nausea: e.target.checked })}
                            id="nauseaCheck"
                        />
                        <label className="form-check-label" htmlFor="nauseaCheck">
                            Токсикоз
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={entryInput.fatigue}
                            onChange={e => setEntryInput({ ...entryInput, fatigue: e.target.checked })}
                            id="fatigueCheck"
                        />
                        <label className="form-check-label" htmlFor="fatigueCheck">
                            Усталость
                        </label>
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5"
                            placeholder="Настроение (например: Радостное, Спокойное)"
                            value={entryInput.mood}
                            onChange={e => setEntryInput({ ...entryInput, mood: e.target.value })}
                        />
                    </div>
                </div>
            </form>

            {entries.length > 0 && (
                <>
                    <div className="d-flex justify-content-end">
                        <button onClick={resetAll} className="btn btn-outline-secondary mb-4">
                            Сбросить все данные
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Неделя</th>
                                    <th>Головная боль</th>
                                    <th>Токсикоз</th>
                                    <th>Усталость</th>
                                    <th>Настроение</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry, idx) => (
                                    <tr key={idx}>
                                        <td>{entry.week}</td>
                                        <td>{entry.headache ? '✔️' : '-'}</td>
                                        <td>{entry.nausea ? '✔️' : '-'}</td>
                                        <td>{entry.fatigue ? '✔️' : '-'}</td>
                                        <td>{entry.mood || '-'}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteEntry(entry.week)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default WellnessDiary;
