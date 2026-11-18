import { Link, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  UserRound,
  X,
} from "lucide-react";
import logo from "@/assets/senai-logo.png";
import { sidebarFooterItem, sidebarItems } from "./sidebar.config";
import { useSidebar } from "./useSidebar";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.css";

function Sidebar({ role = "aluno" }) {
  const location = useLocation();
  const {
    isMobileOpen,
    closeMobile,
    toggleMobile,
  } = useSidebar();

  const items = sidebarItems[role] ?? sidebarItems.aluno;
  const isProfessor = role === "professor";
  const perfilNome = isProfessor ? "Mariana" : "João Silva";
  const perfilCargo = isProfessor ? "Professor" : "Aluno";
  const FooterIcon = sidebarFooterItem.icon;

  const scopedClassName = [
    styles.sidebar,
    isProfessor ? styles.professor : "",
    isMobileOpen ? styles.mobileOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isExactMatch = (item) => {
    const pathname = location.pathname;
    if (item.exact) return pathname === item.to;
    if (item.primary) return pathname === item.to;
    if (item.to === "/") return pathname === "/";
    return false;
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.mobileToggle} ${isMobileOpen ? styles.mobileToggleOpen : ""}`}
        onClick={toggleMobile}
        aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMobileOpen}
        aria-controls="sidebar-nav"
      >
        {isMobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
      </button>

      <div
        className={`${styles.overlay} ${isMobileOpen ? styles.overlayVisible : ""}`}
        onClick={closeMobile}
        aria-hidden={!isMobileOpen}
      />

      <aside className={scopedClassName} aria-label="Menu principal">
        <div className={styles.header}>
          <div className={styles.logoWrap}>
            <img src={logo} alt="Logo SENAI" />
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true">
            <UserRound size={26} />
          </div>

          <div className={styles.profileText}>
            <p>{perfilNome}</p>
            <span>{perfilCargo}</span>
          </div>
        </div>

        <nav id="sidebar-nav" className={styles.nav} aria-label="Menu principal">
          <ul className={styles.list}>
            {items.map((item) => (
              <SidebarItem
                key={`${role}-${item.label}`}
                item={item}
                collapsed={false}
                isSelected={isExactMatch(item)}
                onNavigate={closeMobile}
              />
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <Link
            to={sidebarFooterItem.to}
            onClick={closeMobile}
            className={`${styles.link} ${styles.footerLink}`}
            aria-label="Sair do sistema"
          >
            <span className={styles.iconWrap} aria-hidden="true">
              <FooterIcon size={18} />
            </span>
            <span className={styles.label}>Sair</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
