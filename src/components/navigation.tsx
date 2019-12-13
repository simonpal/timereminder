import React from "react";
import { Link, useHistory } from "react-router-dom";
import { routes } from "../routes";
import { CustomerIcon, ProjectIcon, CalendarIcon } from "./icons";
import { Logo } from './logo';

const iconMap = [CalendarIcon, CustomerIcon, ProjectIcon];

export const Navigation = () => {
  const history = useHistory();
  const isActive = (path: string) => {
    if (path === "/" && history.location.pathname === "/") return true;
    const firstLevel = history.location.pathname.split("/").filter(Boolean)[0];
    return path.includes(firstLevel);
  };
  return (
    <aside>
      <div className="logo">
        <Logo />
        t:me
        <span>remind</span>
      </div>
      <nav>
        {routes.map((route: any, idx: number) =>
          route.title ? (
            <Link
              key={`link-${idx}`}
              className={isActive(route.path) ? "active" : ""}
              to={route.path}
            >
              {iconMap[idx]()} {route.title}
            </Link>
          ) : null
        )}
      </nav>
    </aside>
  );
};
