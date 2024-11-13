// pages/index.tsx
import { FC } from "react";
import { Menu } from "../componentes/Menu";  // Importa o componente Menu
import Head from "next/head";
import styles from "../styles/Home.module.css";  // Assumindo que existe um arquivo de estilos

const Home: FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Loja Next</title>
      </Head>
      
      <Menu /> {/* Adiciona o menu */}
      
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
