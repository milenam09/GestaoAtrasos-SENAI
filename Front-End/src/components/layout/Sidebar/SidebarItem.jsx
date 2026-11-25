import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function SidebarItem({ item, collapsed = false, isSelected = false, onNavigate }) {
  const Icon = item.icon;
  const className = [
    styles.link,
    isSelected ? styles.active : "",
    collapsed ? styles.linkCollapsed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className={styles.label}>{item.label}</span>
    </>
  );

  return (
    <li className={styles.item}>
      {item.to ? (
        <NavLink
          to={item.to}
          end={item.exact}
          onClick={onNavigate}
          className={className}
          aria-current={isSelected ? "page" : undefined}
        >
          {content}
        </NavLink>
      ) : (
        <span className={className}>{content}</span>
      )}
    </li>
  );
}

export default SidebarItem;
