import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown as ChevronDownIcon,
  FaEllipsisH as HorizontaLDots,
} from "react-icons/fa";
import DashboardLogo from "../../public/images/logo/logo-dark.png";
import Logo from "../../public/images/logo/logo-dark.png";
import { useSidebar } from "../context/SidebarContext";
import { navItems } from "./NavItems";
import { NavItem, SubNavItem } from "../interface/types";


const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<Set<string>>(new Set());
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  const isActive = useCallback((path?: string) => location.pathname === path, [location.pathname]);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu((prev) => {
      const updated = new Set(prev);
      updated.has(key) ? updated.delete(key) : updated.add(key);
      return updated;
    });
  };

  useEffect(() => {
    openSubmenu.forEach((key) => {
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    });
  }, [openSubmenu]);

  const renderMenuItems = (items: (NavItem | SubNavItem)[], menuType = "main", parentKey = "") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const hasChildren = nav.subItems && nav.subItems.length > 0;
        const key = `${parentKey}-${nav.name}-${index}`;
        const open = openSubmenu.has(key);

        return (
          <li key={key}>
            {hasChildren ? (
              <button
                onClick={() => toggleSubmenu(key)}
                className={`menu-item group cursor-pointer ${open ? "menu-item-active" : "menu-item-inactive"} ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span className={`text-[20px] text-gray-500 group-hover:text-brand-500 transition-colors duration-200 ${open ? "text-brand-600" : ""}`}>
                  {"icon" in nav && nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon className={`ml-auto w-3 h-3 transition-transform duration-200 ${open ? "rotate-180 text-brand-500" : ""}`} />
                )}
              </button>
            ) : (
              nav.path && (
                <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}>
                  <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                    {"icon" in nav && nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {hasChildren && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[key] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{ height: open ? `${subMenuHeight[key] || 0}px` : "0px" }}
              >
                {open && (
                  <div className="ml-9 mt-2">
                    {renderMenuItems(nav.subItems!, menuType, key)}
                  </div>
                )}
              </div>
            )}

          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 \
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"} \
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} \
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-4 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img className="dark:hidden" src={DashboardLogo} alt="Logo" width={240} height={40} />
              <img className="hidden dark:block" src={DashboardLogo} alt="Logo" width={240} height={40} />
            </>
          ) : (
            <img src={Logo} alt="Logo" width={60} height={60} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          {/* general items */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                {isExpanded || isHovered || isMobileOpen ? "General" : <HorizontaLDots className="size-6" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
