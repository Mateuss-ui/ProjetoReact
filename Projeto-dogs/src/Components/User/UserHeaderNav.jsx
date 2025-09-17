import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { use } from "react";
import { UserContext } from "../../UserContext";
import Adicionar from "../../Assets/adicionar.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import Sair from "../../Assets/sair.svg?react";
import Fotos from "../../Assets/feed.svg?react";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

function UserHeaderNav() {
    const mobile = useMedia("(max-width: 40rem)");
    const { userLogout } = React.useContext(UserContext);
    const navigate = useNavigate();
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const {pathname} = useLocation();

    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }


  return (
    <>
    {mobile && <button aria-label="Menu" className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
    <nav className={`${mobile ? styles.navMobile : styles.nav } ${mobileMenu && styles.navMobileActive}`}>
      <NavLink to="/conta" end>
        <Fotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas />
        {mobile && 'Estatisticas'}
      </NavLink>
      <NavLink to="/conta/postar">
        <Adicionar />
        {mobile && 'Adicionar foto'}
      </NavLink>
      <button onClick={handleLogout}>
        <Sair />
        {mobile && 'Sair'}
      </button>
    </nav>
    </>
  );
}

export default UserHeaderNav;
