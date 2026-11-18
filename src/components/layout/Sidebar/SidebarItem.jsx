import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function SidebarItem({ item, collapsed = false, isSelected = false, onNavigate }) {
  const Icon = item.icon;

  return (
    <li className={styles.item}>
      <NavLink
        to={item.to}
        end={item.exact}
        onClick={onNavigate}
        className={[
          styles.link,
          isSelected ? styles.active : "",
          collapsed ? styles.linkCollapsed : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-current={isSelected ? "page" : undefined}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={18} />
        </span>
        <span className={styles.label}>{item.label}</span>
      </NavLink>
    </li>
  );
}

export default SidebarItem;
