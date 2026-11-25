import { useEffect, useState } from "react";

const STORAGE_KEY = "senai-sidebar-collapsed";
const MOBILE_BREAKPOINT = 900;

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      return storedValue === "true";
    } catch {
      return false;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {
      // Ignora falhas de armazenamento em ambientes restritivos.
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  useEffect(() => {
    const offset = isMobile ? "0px" : isCollapsed ? "88px" : "270px";
    document.documentElement.style.setProperty("--sidebar-offset", offset);
    document.body.style.overflow = isMobileOpen && isMobile ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCollapsed, isMobile, isMobileOpen]);

  const toggleCollapse = () => {
    setIsCollapsed((current) => !current);
  };

  const openMobile = () => setIsMobileOpen(true);
  const closeMobile = () => setIsMobileOpen(false);
  const toggleMobile = () => setIsMobileOpen((current) => !current);

  return {
    isCollapsed,
    setIsCollapsed,
    toggleCollapse,
    isMobile,
    isMobileOpen,
    openMobile,
    closeMobile,
    toggleMobile,
  };
}
