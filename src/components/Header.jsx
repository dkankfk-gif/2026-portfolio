import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

const SECTIONS = ["home", "about", "work", "contact"];

const Header = () => {
  const [active, setActive] = useState("home");
  const headerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    let raf = 0;

    const getHeaderH = () => headerEl.offsetHeight || 0;

    const setThemeById = (id) => {
      const el = document.getElementById(id);
      const theme = el?.dataset?.header; // "light" | "dark"
      headerEl.setAttribute("data-theme", theme || "light");
    };

    // ✅ 화면 안에서 "헤더 아래 기준선"이 들어간 섹션을 찾음
    const pick = () => {
      raf = 0;

      const headerH = getHeaderH();
      const anchorY = headerH + 12; // viewport 기준 y (헤더 아래)

      let currentId = "home";

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect(); // viewport 기준
        const top = rect.top;
        const bottom = rect.bottom;

        // anchorY가 그 섹션 안에 들어가면 그게 active
        if (top <= anchorY && bottom > anchorY) {
          currentId = id;
          break;
        }

        // 아직 섹션을 안 만났으면, 지난 섹션 유지용
        // (스크롤 내려갈 때 top이 anchorY보다 위로 지나간 가장 마지막 섹션)
        if (top <= anchorY) currentId = id;
      }

      setActive((prev) => (prev === currentId ? prev : currentId));
      setThemeById(currentId);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };

    const onResize = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ✅ 첫 로드 보정(폰트/레이아웃 잡힌 뒤에도 한번 더)
    pick();
    requestAnimationFrame(pick);
    setTimeout(pick, 150);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

    const goTo = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    };

  return (
    <header ref={headerRef}>
      <div className="inner">
        <a
          href="#home"
          className="logo"
          aria-label="Go to home"
          onClick={(e) => {
            e.preventDefault();
            goTo("home");
          }}
        >
          {/* svg 그대로 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M22.9995 4.4906V4.3894C22.9995 3.06977 21.9297 2 20.6101 2C19.2905 2 18.2207 3.06977 18.2207 4.3894V4.4906C18.2207 5.81023 19.2905 6.88 20.6101 6.88C21.9297 6.88 22.9995 5.81023 22.9995 4.4906Z" fill="currentColor"/>
            <path d="M22.9995 23.6106V10.3894C22.9995 9.06977 21.9297 8 20.6101 8C19.2905 8 18.2207 9.06977 18.2207 10.3894V23.6106C18.2207 24.9302 19.2905 26 20.6101 26C21.9297 26 22.9995 24.9302 22.9995 23.6106Z" fill="currentColor"/>
            <path d="M14.7147 10.24C13.3835 10.24 12.3044 11.3191 12.3044 12.6503L12.3044 20.9173C12.3044 21.3269 11.9724 21.6589 11.5628 21.6589C11.1532 21.6589 10.8212 21.3269 10.8212 20.9173V18.3126C10.8212 16.9814 9.74203 15.9023 8.41087 15.9023C7.0797 15.9023 6.00057 16.9814 6.00057 18.3126V23.5382C6.00057 24.8978 7.10277 26 8.46241 26H14.6632C16.0228 26 17.125 24.8978 17.125 23.5382L17.125 12.6503C17.125 11.3191 16.0459 10.24 14.7147 10.24Z" fill="currentColor"/>
            <path d="M8.41029 14.72C9.74146 14.72 10.8206 13.6409 10.8206 12.3097L10.8206 7.07585C10.8206 6.66626 11.1526 6.33422 11.5622 6.33422C11.9718 6.33422 12.3038 6.66626 12.3038 7.07585V7.70044C12.3038 8.45499 12.9155 9.06667 13.6701 9.06667H14.7141C16.0453 9.06667 17.1244 7.98754 17.1244 6.65637V4.46183C17.1244 3.1022 16.0222 2 14.6626 2H8.46184C7.10221 2 6.00001 3.1022 6.00001 4.46183L6 12.3097C6 13.6409 7.07912 14.72 8.41029 14.72Z" fill="currentColor"/>
          </svg>
        </a>

        <div className="headerNav" aria-label="Section indicator">
          {SECTIONS.map((id) => (
            <button
              key={id}
              type="button"
              className={active === id ? "active" : ""}
              onClick={() => goTo(id)}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="date">[2026]</div>
      </div>
    </header>
  );
};

export default Header;
