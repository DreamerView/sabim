"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const WeightTracker = () => {
    const [height, setHeight] = useState('');
    const [prePregnancyWeight, setPrePregnancyWeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const [weekInput, setWeekInput] = useState('');
    const [weightInput, setWeightInput] = useState('');
    const [weights, setWeights] = useState([]);

    // Загрузка из localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sabim_weight_data");
        if (saved) {
            const parsed = JSON.parse(saved);
            setHeight(parsed.height || '');
            setPrePregnancyWeight(parsed.prePregnancyWeight || '');
            setWeights(parsed.weights || []);
            if (parsed.height && parsed.prePregnancyWeight) {
                const h = parseFloat(parsed.height) / 100;
                const bmiValue = parseFloat(parsed.prePregnancyWeight) / (h * h);
                setBmi(bmiValue.toFixed(1));
            }
        }
    }, []);

    // Сохранение в localStorage
    useEffect(() => {
        const data = {
            height,
            prePregnancyWeight,
            weights
        };
        localStorage.setItem("sabim_weight_data", JSON.stringify(data));
    }, [height, prePregnancyWeight, weights]);

    const calculateBMI = () => {
        if (!height || !prePregnancyWeight) return;
        const heightMeters = parseFloat(height) / 100;
        const bmiValue = parseFloat(prePregnancyWeight) / (heightMeters * heightMeters);
        setBmi(bmiValue.toFixed(1));
    };

    const getRecommendedGain = () => {
        if (bmi === null) return [12, 18];
        const bmiValue = parseFloat(bmi);

        if (bmiValue < 18.5) return [12.5, 18];
        if (bmiValue >= 18.5 && bmiValue <= 24.9) return [11.5, 16];
        if (bmiValue >= 25 && bmiValue <= 29.9) return [7, 11.5];
        return [5, 9];
    };

    const addEntry = (e) => {
        e.preventDefault();
        if (!weekInput || !weightInput) return;
        setWeights(prev => [...prev, { week: parseInt(weekInput), weight: parseFloat(weightInput) }]
            .filter((v, i, a) => a.findIndex(t => t.week === v.week) === i)
            .sort((a, b) => a.week - b.week));
        setWeekInput('');
        setWeightInput('');
    };

    const deleteEntry = (week) => {
        setWeights(prev => prev.filter(w => w.week !== week));
    };

    const resetAll = () => {
        if (confirm("Удалить все данные?")) {
            setHeight('');
            setPrePregnancyWeight('');
            setBmi(null);
            setWeights([]);
            localStorage.removeItem("sabim_weight_data");
        }
    };

    const [minGain, maxGain] = getRecommendedGain();
    const recommendedLine = Array.from({ length: 41 }, (_, week) => ({
        week,
        min: parseFloat(prePregnancyWeight) + (minGain * week / 40),
        max: parseFloat(prePregnancyWeight) + (maxGain * week / 40)
    }));

    const chartData = recommendedLine.map(item => {
        const found = weights.find(w => w.week === item.week);
        return {
            week: item.week,
            min: item.min,
            max: item.max,
            actual: found ? found.weight : null
        };
    });

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow"  data-aos="fade-up">
            <h1 className="text-center mb-4">Трекер веса при беременности</h1>
            <p className="mx-auto text-center text-muted mb-5" style={{ maxWidth: 600 }}>
                Укажите рост и вес до беременности для персонального расчёта набора веса.
            </p>

            {/* Ввод роста и веса */}
            <div className="row mx-auto mb-4" style={{ maxWidth: 500 }}>
                <div className="col-6 mb-3">
                    <input
                        type="number"
                        placeholder="Рост (см)"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5"
                    />
                </div>
                <div className="col-6 mb-3">
                    <input
                        type="number"
                        placeholder="Вес (кг)"
                        value={prePregnancyWeight}
                        onChange={e => setPrePregnancyWeight(e.target.value)}
                        className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5"
                    />
                </div>
                <div className="col-12 d-flex gap-2">
                    <button onClick={calculateBMI} className="btn btn-danger w-100 rounded-4 fw-bold fs-5">
                        Рассчитать BMI
                    </button>
                    <button onClick={resetAll} className="btn btn-outline-secondary rounded-4 fw-bold fs-5">
                        Сбросить
                    </button>
                </div>
            </div>

            {bmi && (
                <>
                    <div className="text-center mb-5">
                        <h5>BMI: {bmi}</h5>
                        <p className="text-muted">
                            Рекомендованный набор веса: {minGain} – {maxGain} кг.
                        </p>
                    </div>

                    {/* Ввод фактического веса */}
                    <form onSubmit={addEntry} className="row mx-auto mb-5" style={{ maxWidth: 500 }}>
                        <div className="col-5">
                            <input
                                type="number"
                                min="0"
                                max="40"
                                placeholder="Неделя"
                                value={weekInput}
                                onChange={e => setWeekInput(e.target.value)}
                                className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5"
                                required
                            />
                        </div>
                        <div className="col-5">
                            <input
                                type="number"
                                step="0.1"
                                placeholder="Вес (кг)"
                                value={weightInput}
                                onChange={e => setWeightInput(e.target.value)}
                                className="form-control bg-body-secondary rounded-4 text-center fw-bold fs-5"
                                required
                            />
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-danger w-100 rounded-4 fw-bold fs-5">+</button>
                        </div>
                    </form>

                    {/* График */}
                    <div className="bg-body-tertiary border rounded-4 p-3 mb-5">
                        <h5 className="fw-bold mb-3">График веса</h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="min" stroke="#91d5ff" strokeWidth={2} dot={false} name="Минимум нормы" />
                                <Line type="monotone" dataKey="max" stroke="#2f54eb" strokeWidth={2} dot={false} name="Максимум нормы" />
                                <Line type="monotone" dataKey="actual" stroke="#ff2e54" strokeWidth={3} name="Ваш вес" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Таблица */}
                    {weights.length > 0 && (
                        <>
                            <h5 className="fw-bold mb-3">Данные по неделям</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Неделя</th>
                                            <th>Ваш вес (кг)</th>
                                            <th>Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {weights.map((w, idx) => (
                                            <tr key={idx}>
                                                <td>{w.week}</td>
                                                <td>{w.weight}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => deleteEntry(w.week)}
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
                </>
            )}
        </div>
    );
};

export default WeightTracker;
