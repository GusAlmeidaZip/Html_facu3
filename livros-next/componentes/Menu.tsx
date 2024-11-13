// components/Menu.tsx
import Link from "next/link";
import { FC } from "react";

export const Menu: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" passHref>
          <a className="navbar-brand">Loja Next</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" passHref>
                <a className="nav-link active">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/livrolista" passHref>
                <a className="nav-link">Livro Lista</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/livrodados" passHref>
                <a className="nav-link">Livro Dados</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
