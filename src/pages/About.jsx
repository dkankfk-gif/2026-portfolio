// src/pages/About.jsx
import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./About.css";
import HoverPreview from "../components/HoverPreview";

gsap.registerPlugin(ScrollTrigger);

// ✅ 스크램블 훅: hover 시작 → duration 후 자동 복귀 / hover 해제 즉시 복귀
function useScrambleText(originalText) {
  const elRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const clearAll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    intervalRef.current = null;
    timerRef.current = null;
  };

  const stop = () => {
    clearAll();
    if (elRef.current) elRef.current.textContent = originalText;
  };

  // ✅ 매번 새로 시작
  const start = ({ duration = 1400, speed = 28 } = {}) => {
    if (!elRef.current) return;

    stop(); // 돌고 있으면 끊고 재시작
    const len = originalText.length;

    intervalRef.current = setInterval(() => {
      if (!elRef.current) return;

      let out = "";
      for (let i = 0; i < len; i++) {
        const c = originalText[i];
        out += c === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
      }
      elRef.current.textContent = out;
    }, speed);

    timerRef.current = setTimeout(() => {
      stop();
    }, duration);
  };

  useEffect(() => stop, []);
  return { elRef, start, stop };
}

/** ✅ 라이브러리 없이 글자 쪼개기(스플리팅) */
function splitToChars(el) {
  if (!el) return [];
  if (el.dataset.split === "1") return Array.from(el.querySelectorAll(".char"));

  const text = el.textContent ?? "";
  el.textContent = "";
  el.dataset.split = "1";

  const frag = document.createDocumentFragment();
  [...text].forEach((ch) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    frag.appendChild(span);
  });

  el.appendChild(frag);
  return Array.from(el.querySelectorAll(".char"));
}

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textWrapRef = useRef(null);

  // ✅ skills
  const skillsRef = useRef(null);

  // ✅ About 라벨 스크램블
  const aboutScramble = useScrambleText("About");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const textWrap = textWrapRef.current;
    const skills = skillsRef.current;

    if (!section || !img || !textWrap) return;

    const FROM = { w: 430, h: 500 };
    const TO = { w: 600, h: 700 };

    // scope를 크게 잡아야 skills(다음 섹션) 트리거도 안정적으로 살아있습니다.
    const ctx = gsap.context(() => {
      // =========================
      // About(기존 그대로)
      // =========================
      gsap.set(img, {
        width: FROM.w,
        height: FROM.h,
        transformOrigin: "100% 50%",
        willChange: "width,height",
      });

      gsap.set(textWrap, {
        opacity: 0,
        y: 18,
        filter: "blur(12px)",
        willChange: "opacity, transform, filter",
      });

      const tlAbout = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          id: "aboutPin",
          start: "top top",
          end: "+=900",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tlAbout
        .to(textWrap, {
          opacity: 0.92,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          duration: 0.22,
        })
        .to(
          img,
          {
            width: TO.w,
            height: TO.h,
            ease: "none",
            duration: 0.78,
          },
          "<"
        );

      // =========================
      // Skills(추가 구간)
      // 타이틀: 글자별(스플리팅) / 목록: 덩어리(ROW)로 블러→선명
      // =========================
      if (!skills) return;

      const titleLine1 = skills.querySelector(".skillsTitleLine1");
      const titleLine2 = skills.querySelector(".skillsTitleLine2");
      const sub = skills.querySelector(".skillsSub");
      const cat1 = skills.querySelectorAll(".skillRow:nth-child(1) .skillCat");
      const cat2 = skills.querySelectorAll(".skillRow:nth-child(2) .skillCat");
      const items1 = skills.querySelectorAll(".skillRow:nth-child(1) .skillItem"); 
      const items2 = skills.querySelectorAll(".skillRow:nth-child(2) .skillItem"); 

      const rowEls = Array.from(skills.querySelectorAll(".skillRow"));
      const itemEls = Array.from(skills.querySelectorAll(".skillItem"));
      const catEls = Array.from(skills.querySelectorAll(".skillCat"));

      const titleChars = [
        ...splitToChars(titleLine1),
        ...splitToChars(titleLine2),
      ];

      // ✅ 초기값 세팅 (sub + row + item 전부 숨김)
      gsap.set(titleChars, {
        opacity: 0,
        y: 22,
        filter: "blur(14px)",
        willChange: "transform, opacity, filter",
      });

      gsap.set([sub, ...cat1, ...cat2, ...items1, ...items2], {
        opacity: 0,
        y: 22,
        filter: "blur(14px)",
        willChange: "transform, opacity, filter",
      });

      const tlSkills = gsap.timeline({
        scrollTrigger: {
          id: "skillsST",
          trigger: skills,
          start: "top 30%",
          end: "+=900",     // ✅ 길게 (빨리 끝나는 문제 해결)
          scrub: 2,         // ✅ 느리게 따라오기
          //markers: true,
          invalidateOnRefresh: true,
        },
      });

      tlSkills
        .to(titleChars, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          stagger: 0.02,
          duration: 1,
        })
        .to(
          sub,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.1,
          },
          "<+=0.10"
        )

        // ✅ 1) Design & Video 카테고리 + 5개
        .to(
          cat1,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.7,
          },
          "<+=0.10"
        )
        .to(
          items1,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            stagger: 0.18,
            duration: 1.4,
          },
          "<+=0.06"
        )

        // ✅ 2) Development는 “조금 더 늦게”
        .to(
          cat2,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.7,
          },
          ">+=0.06" // ✅ CHANGED: 여기 숫자 키우면 더 늦게 나옴 (0.35~0.8)
        )
        .to(
          items2,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            stagger: 0.18,
            duration: 1.4,
          },
          "<+=0.06"
        );

      ScrollTrigger.refresh();
    }, skillsRef.current ?? sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="about" className="aboutSection">
        <div className="aboutInner">
          <div className="aboutLeft">
            <div ref={textWrapRef} className="aboutTextWrap">
              <p className="aboutText ko">
                여러 레퍼런스를 보며 아이디어를 얻고, 이를 제 방식으로 풀어<br />
                시각적인 결과물로 만들어 갑니다.<br />
                새로운 것은 직접 만들어 보며 익히고, 막히는 부분이 있으면<br />
                여러 번 시도하면서 자료를 찾아 끝까지 해결하려 합니다.<br />
                협업할 때는 책임감을 갖고 맡은 역할을 끝까지 해내는 편입니다.
              </p>

              {/* hover preview */}
              <HoverPreview
                imgSrc="/img/soon.avif"
                width={120}
                offsetX={10}
                offsetY={-20}
                className="aboutHoverPreview"
              >
                <button
                  type="button"
                  className="aboutLabel aboutLabelBtn"
                  aria-label="About"
                  onMouseEnter={() => aboutScramble.start({ duration: 1400, speed: 28 })}
                  onMouseLeave={aboutScramble.stop}
                  onFocus={() => aboutScramble.start({ duration: 1400, speed: 28 })}
                  onBlur={aboutScramble.stop}
                >
                  <span ref={aboutScramble.elRef}>About</span>
                </button>
              </HoverPreview>
            </div>
          </div>

          <div className="aboutRight">
            <div className="aboutImgStage">
              <img
                ref={imgRef}
                className="aboutImg"
                src="/img/about-me.png"
                alt="About visual"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={skillsRef}
        className="skillsSection"
        aria-label="Tools and skills"
      >
        <div className="skillsInner">
          <div className="skillsHead">
            <h2 className="skillsTitle" aria-label="Tools and skills">
              <span className="skillsTitleLine1">TOOLS</span>
              <span className="skillsTitleLine2">&amp; skills</span>
            </h2>

            <p className="skillsSub">DESIGN · VIDEO · FRONTEND</p>
          </div>

          <div className="skillsGrid">
            <div className="skillRow">
              <div className="skillCat">Design &amp; Video</div>
              <ul className="skillList">
                <li className="skillItem">Photoshop</li>
                <li className="skillItem">Illustrator</li>
                <li className="skillItem">Premiere Pro</li>
                <li className="skillItem">After Effects</li>
                <li className="skillItem">Figma</li>
              </ul>
            </div>

            <div className="skillRow">
              <div className="skillCat">Development</div>
              <ul className="skillList">
                <li className="skillItem">Visual Studio</li>
                <li className="skillItem">jQuery</li>
                <li className="skillItem">JavaScript</li>
                <li className="skillItem">React</li>
                <li className="skillItem">GSAP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
