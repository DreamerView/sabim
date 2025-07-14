"use client";
import { useState } from "react";

const DueDateCalculator = () => {
    const [conceptionDate, setConceptionDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [weeksLeft, setWeeksLeft] = useState('');
    const [daysLeft, setDaysLeft] = useState('');
    const [loading, setLoading] = useState(false);

    const calculateDueDate = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const [year, month, day] = conceptionDate.split("-");
            const conception = new Date(year, month - 1, day);
            const today = new Date();
            const due = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000);

            const msLeft = due - today;
            const days = Math.max(0, Math.floor(msLeft / (1000 * 60 * 60 * 24)));
            const weeks = Math.floor(days / 7);

            const formatDate = (d) => `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;

            setDueDate(formatDate(due));
            setWeeksLeft(weeks);
            setDaysLeft(days);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow" data-aos="fade-up">
            <h1 className="text-center mt-md-5 mb-4">Калькулятор даты родов</h1>
            <p className="mx-auto text-center text-muted mb-5" style={{ maxWidth: 600 }}>
                Укажите дату зачатия или овуляции, чтобы узнать предполагаемую дату родов и оставшееся время.
            </p>

            <form onSubmit={calculateDueDate} style={{ maxWidth: 500 }} className="mx-auto row">
                <div className="col-md-8 mb-4">
                    <input
                        type="date"
                        className="form-control bg-body-secondary rounded-4 px-4 fs-5"
                        value={conceptionDate}
                        onChange={(e) => setConceptionDate(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4 mb-4">
                    <button
                        type="submit"
                        className="btn w-100 rounded-4 text-white fs-5"
                        style={{ backgroundColor: "#ff2e54" }}
                    >
                        Рассчитать
                    </button>
                </div>
            </form>

            {loading && (
                <div className="text-center mt-5 pt-5 border-top">
                    <div className="spinner-border m-5" style={{ width: "4rem", height: "4rem", color: "#ff2e54" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && dueDate && (
                <>
                    <h3 className="text-center mt-5 pt-5 mb-4 border-top">Предполагаемая дата родов</h3>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-3 rounded-4 align-items-center">
                                <img src="/3d/calendar.png" alt="calendar" width={56} height={56} />
                                <div className="ms-3">
                                    <h6 className="fw-bold">Дата родов</h6>
                                    <p className="m-0 text-muted">{dueDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-3 rounded-4 align-items-center">
                                <img src="/3d/time.png" alt="weeks left" width={56} height={56} />
                                <div className="ms-3">
                                    <h6 className="fw-bold">Осталось недель</h6>
                                    <p className="m-0 text-muted">{weeksLeft}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="d-flex bg-body-tertiary border p-3 rounded-4 align-items-center">
                                <img src="/3d/date.png" alt="days left" width={56} height={56} />
                                <div className="ms-3">
                                    <h6 className="fw-bold">Осталось дней</h6>
                                    <p className="m-0 text-muted">{daysLeft}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DueDateCalculator;
