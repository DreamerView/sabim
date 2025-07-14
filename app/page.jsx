"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const PregnancyCalendar = () => {
    const [inputDate, setInputDate] = useState('');
    const [date, setDate] = useState(0);

    const [result, setResult] = useState({ date: 'Ожидание...', month: '', year: '' });
    const [ownWeek, setWeek] = useState('0');
    const [timePregnant, setTimePregnant] = useState('0');
    const [weeks, setWeeks] = useState([{}]);
    const [full, setFull] = useState('not');
    const [trimester, setTrimester] = useState(0);
    const [loading, setLoading] = useState(false);

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const getMonthName = useCallback((e) => months[e] || '', []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setDate(inputDate);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        if (date !== 0) {
            const today = Date.now();
            const [year, month, day] = date.split("-");
            const newDate = new Date(year, month - 1, day);
            const endDate = new Date(newDate.getTime() + 40 * 7 * 24 * 60 * 60 * 1000);
            const weeksPassed = parseInt((today - newDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

            setResult({
                date: endDate.getDate(),
                month: getMonthName(endDate.getMonth()),
                year: endDate.getFullYear()
            });

            setWeek(weeksPassed <= 0 ? 'Неизвестно' : weeksPassed);

            if (weeksPassed >= 1 && weeksPassed <= 40) {
                const from = Math.floor((weeksPassed - 1) / 4) * 4 + 1;
                const to = Math.min(from + 3, 40);
                setTimePregnant(`${from}-${to} недели беременности`);
            } else if (weeksPassed >= 40) {
                setTimePregnant("40+ недель. Время готовиться к родам.");
            } else {
                setTimePregnant("Неизвестно");
            }

            setTrimester(
                weeksPassed >= 1 && weeksPassed <= 42
                    ? Math.min(3, Math.floor((weeksPassed - 1) / 13) + 1)
                    : 'Неизвестно'
            );

            const findDays = (num, timestamp) => {
                const start = new Date(timestamp);
                const end = new Date(timestamp + 6 * 24 * 60 * 60 * 1000);
                const alert = [4, 8, 12, 16].includes(num) ? 'critical' : '';
                return {
                    number: num,
                    start: `${start.getDate()} ${getMonthName(start.getMonth())} ${start.getFullYear()}`,
                    end: `${end.getDate()} ${getMonthName(end.getMonth())} ${end.getFullYear()}`,
                    alert
                };
            };

            const startDate = newDate.getTime();
            const allWeeks = [];
            for (let i = 0; i <= 42; i++) {
                allWeeks.push(findDays(i, startDate + i * 7 * 24 * 60 * 60 * 1000));
            }
            setWeeks(allWeeks);
        }
    }, [date, getMonthName]);

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow" data-aos="fade-up">
            <h1 className="text-center mt-md-5 mb-4">Календарь беременности</h1>
            <p className="text-center mx-auto m-0 mb-4 text-muted lh-md" style={{maxWidth:600,width:"calc(100% - 16px)",fontSize:"1rem"}}>Укажите дату первого дня последней менструации для расчёта срока беременности<br/><small className="text-center text-warning">(Это медицинский метод расчёта срока)</small></p>
            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 500, width: "100%" }}
                className="mx-auto row"
            >
                <div className="col-md-8">
                    <input
                        className="form-control bg-body-secondary mx-auto rounded-4 text-center fw-bold p-2 mb-4 fs-5"
                        type="date"
                        value={inputDate}
                        onChange={e => setInputDate(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <button
                        type="submit"
                        className="btn w-100 mx-auto rounded-4 p-2 text-white fs-5"
                        style={{backgroundColor:"#ff2e54"}}
                    >
                        Выбрать
                    </button>
                </div>
            </form>

            {loading && (
                <div className="text-center mt-5 pt-5 border-top" data-aos="fade-in">
                    <div className="spinner-border m-5" style={{width: "4rem", height: "4rem",color:"#ff2e54"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && date !== 0 && (
                <div data-aos="fade-up">
                    <h3 className="text-center pt-5 mt-5 border-top">Параметры беременности</h3>
                    <div className="row mt-5">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                                <img src="/3d/calendar.png" alt="" width={56} height={56} />
                                <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                    <h6 className="fw-bold m-0">Ожидаемая дата</h6>
                                    <p className="m-0 text-muted">{result.date} {result.month.toLowerCase()} {result.year}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                                <img src="/3d/date.png" alt="" width={56} height={56} />
                                <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                    <h6 className="fw-bold m-0">Текущая неделя</h6>
                                    <p className="m-0 text-muted">{ownWeek}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                                <img src="/3d/time.png" alt="" width={56} height={56} />
                                <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                    <h6 className="fw-bold m-0">Период</h6>
                                    <p className="m-0 text-muted">{timePregnant}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                                <img src="/3d/123.png" alt="" width={56} height={56} />
                                <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                    <h6 className="fw-bold m-0">Триместр:</h6>
                                    <p className="m-0 text-muted">{trimester}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="my-5 pt-5 border-top text-center">Календарь по неделям</h3>

                    <div className={`row`}>
                        {weeks.map((week, index) => (
                            <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                                <div className="p-3" style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '12px',
                                    backgroundColor: week.alert === 'critical' ? '#fff3cd' : '#f9f9f9'
                                }}>
                                    <h6 className="fw-bold">{week.number===0?"Подготовительный этап":`Неделя ${week.number}`}</h6>
                                    <p className="mb-1 text-muted m-0">{week.start} — {week.end}</p>
                                    {week.alert === 'critical' && (
                                        <div className="text-danger small mt-2"><em>Важный период беременности</em></div>
                                    )}
                                    {week.number === 40 && (
                                        <div className="text-success small mt-2"><em>40 неделя! Роды совсем скоро!</em></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default PregnancyCalendar;
