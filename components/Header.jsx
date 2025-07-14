import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/sabim-landscape.png";

const Header = () => {
    return (
        <header className="container-xl py-4">
            <div className="row">
                <div className="col-6">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="Sabim Logo"
                            width={182}
                            height={60}
                            placeholder="blur"
                            priority
                        />
                    </Link>
                </div>
                <div className="col-6 d-flex gap-4 justify-content-end align-items-center">
                    <Link href="/apps" className="btn btn-outline-secondary border-0 btn-lg rounded-5">Помощники</Link>
                    {/* <div className="dropdown">
                        <button className="btn btn-outline-secondary border-0 btn-lg rounded-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Сменить язык
                        </button>
                        <ul className="dropdown-menu mt-2 px-2 py-3 rounded-4">
                            <li><a className="dropdown-item rounded-4" href="#">Казахский</a></li>
                            <li><a className="dropdown-item rounded-4" href="#">Русский</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
