"use client";
import { useState } from "react";

const PlanningCalendar = () => {
    const [cycleLengthInput, setCycleLengthInput] = useState(28);
    const [lastPeriodInput, setLastPeriodInput] = useState('');

    const [ovulation, setOvulation] = useState('');
    const [fertileStart, setFertileStart] = useState('');
    const [fertileEnd, setFertileEnd] = useState('');
    const [daysLeft, setDaysLeft] = useState('');
    const [chance, setChance] = useState('');
    const [nextPeriod, setNextPeriod] = useState('');
    const [lastPeriod, setLastPeriod] = useState('');

    const calculate = (e) => {
        e.preventDefault();
        if (!lastPeriodInput) return;

        const [year, month, day] = lastPeriodInput.split("-");
        const lastDate = new Date(year, month - 1, day);
        const today = new Date();

        const ovulationDate = new Date(lastDate.getTime() + (cycleLengthInput / 2) * 24 * 60 * 60 * 1000);
        const fertileWindowStart = new Date(ovulationDate.getTime() - 2 * 24 * 60 * 60 * 1000);
        const fertileWindowEnd = new Date(ovulationDate.getTime() + 2 * 24 * 60 * 60 * 1000);
        const nextPeriodDate = new Date(lastDate.getTime() + cycleLengthInput * 24 * 60 * 60 * 1000);

        const daysToOvulation = Math.max(0, Math.ceil((ovulationDate - today) / (24 * 60 * 60 * 1000)));
        const conceptionChance = daysToOvulation <= 5 ? `${100 - daysToOvulation * 15}%` : "Низкая";

        const formatDate = (d) => `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;

        setOvulation(formatDate(ovulationDate));
        setFertileStart(formatDate(fertileWindowStart));
        setFertileEnd(formatDate(fertileWindowEnd));
        setNextPeriod(formatDate(nextPeriodDate));
        setDaysLeft(daysToOvulation);
        setChance(conceptionChance);
        setLastPeriod(lastPeriodInput);
    };

    return (
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow">
            <h1 className="text-center mt-md-5 mb-4">Календарь планирования</h1>
            <p className="mx-auto text-center text-muted mb-5" style={{ maxWidth: 600, width: "100%" }}>
                Укажите длительность вашего цикла и дату последней менструации, чтобы рассчитать благоприятные дни для зачатия
            </p>

            <form onSubmit={calculate} style={{ maxWidth: 500 }} className="mx-auto row">
                <div className="col-md-6 mb-4">
                    <label className="form-label">Длительность цикла (дней):</label>
                    <input
                        type="number"
                        className="form-control bg-body-secondary rounded-4 px-4 fs-5"
                        value={cycleLengthInput}
                        onChange={(e) => setCycleLengthInput(parseInt(e.target.value) || 28)}
                        min={21}
                        max={35}
                        required
                    />
                </div>
                <div className="col-md-6 mb-4">
                    <label className="form-label">Дата последней менструации:</label>
                    <input
                        type="date"
                        className="form-control bg-body-secondary rounded-4 px-4 fs-5"
                        value={lastPeriodInput}
                        onChange={(e) => setLastPeriodInput(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn w-100 rounded-4 text-white fs-5"
                        style={{ backgroundColor: "#ff2e54" }}
                    >
                        Рассчитать
                    </button>
                </div>
            </form>

            {lastPeriod && (
                <div className="row">
                    <h3 className="text-center mt-5 pt-5 mb-5 border-top">Индивидуальный прогноз</h3>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                            <img src="/3d/flower.png" alt="" width={56} height={56} />
                            <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                <h6 className="fw-bold m-0">Овуляция</h6>
                                <p className="m-0 text-muted">{ovulation}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                            <img src="/3d/date.png" alt="" width={56} height={56} />
                            <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                <h6 className="fw-bold m-0">Благоприятные дни</h6>
                                <p className="m-0 text-muted">{fertileStart} – {fertileEnd}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                            <img src="/3d/time.png" alt="" width={56} height={56} />
                            <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                <h6 className="fw-bold m-0">До овуляции осталось</h6>
                                <p className="m-0 text-muted">{daysLeft} дней</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                            <img src="/3d/maybe.png" alt="" width={56} height={56} />
                            <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                <h6 className="fw-bold m-0">Вероятность зачатия</h6>
                                <p className="m-0 text-muted">{chance}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex bg-body-tertiary border p-2 rounded-4">
                            <img src="/3d/date.png" alt="" width={56} height={56} />
                            <div className="d-flex flex-column justify-content-center gap-1" style={{ marginLeft: "15px", width: "calc(100% - 72px)" }}>
                                <h6 className="fw-bold m-0">Следующая менструация</h6>
                                <p className="m-0 text-muted">{nextPeriod}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <h3 className="text-center mt-5 pt-5 border-top">Как это работает?</h3>
            <div className="row mt-5">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="bg-body-tertiary border p-3 rounded-4">
                        <h5>📍 Овуляция</h5>
                        <p className="text-muted">Это особый день, когда у женщины выходит яйцеклетка. Только в этот день и несколько дней рядом с ним можно забеременеть.</p>
                        <p className="text-muted">Кратко: Это главный день, когда можно стать мамой.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="bg-body-tertiary border p-3 rounded-4">
                        <h5>🌱 Благоприятные дни</h5>
                        <p className="text-muted">Это дни вокруг овуляции. В эти дни можно забеременеть легче всего.</p>
                        <p className="text-muted">Кратко: Это “удачные” дни для зачатия.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="bg-body-tertiary border p-3 rounded-4">
                        <h5>⏳ До овуляции осталось</h5>
                        <p className="text-muted">Показывает, сколько дней осталось до главного дня (овуляции).</p>
                        <p className="text-muted">Кратко: Это как таймер — через сколько дней появится шанс на беременность.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="bg-body-tertiary border p-3 rounded-4">
                        <h5>🎯 Вероятность зачатия</h5>
                        <p className="text-muted">Это шанс, что вы забеременеете в этом цикле, если будете стараться в нужные дни.</p>
                        <p className="text-muted">Кратко: Чем выше процент — тем выше шанс стать мамой.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="bg-body-tertiary border p-3 rounded-4">
                        <h5>📅 Следующая менструация</h5>
                        <p className="text-muted">Это день, когда по календарю должна начаться следующая менструация (месячные), если беременность не наступила.</p>
                        <p className="text-muted">Кратко: Это дата начала новых “критических дней”.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanningCalendar;
