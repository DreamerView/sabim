import Link from "next/link";

const AppsPage = () => {
    return(
        <div className="container-xl py-5 px-md-5 bg-body rounded-5 shadow" data-aos="fade-up">
            <h1 className="text-center mt-md-5 mb-4">Помощники</h1>
            <p className="text-center mx-auto text-muted" style={{maxWidth:600,width:"100%"}}>Удобные инструменты для планирования и сопровождения беременности. Всё, что нужно — в одном месте.</p>
            <h2 className="mt-5 mb-3">Беременность🤰</h2>
            <p className="text-muted border-bottom pb-4">Отслеживайте каждую неделю беременности, рассчитывайте важные даты и следите за своим состоянием с помощью простых и понятных помощников.</p>
            <div className="row">
                <div className="col-lg-4 col-md-6 d-flex flex-column gap-3">
                    <ul>
                        <li>
                            <Link className="nav-link link-primary" href="/">Календарь беременности</Link>
                        </li>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/planning">Календарь планирования</Link>
                        </li>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/due-date">Калькулятор даты родов</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6 d-flex flex-column gap-3">
                    <ul>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/weight-tracker">Трекер веса при беременности</Link>
                        </li>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/wellness-diary">Дневник самочувствия</Link>
                        </li>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/hospital-bag-list">Чек-лист в роддом</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6 d-flex flex-column gap-3">
                    <ul>
                        <li>
                            <Link className="nav-link link-primary" href="/apps/fetal-movement-tracker">Калькулятор шевелений плода</Link>
                        </li>
                    </ul>
                </div>    
            </div>            
        </div>
    )
};

export default AppsPage;