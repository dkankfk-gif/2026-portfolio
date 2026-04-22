import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Work.css";
import HoverPreview from "../components/HoverPreview";


gsap.registerPlugin(ScrollTrigger);

const WORK_ITEMS = [
  {
    id: "1",
    leftTitle: "Dugout",
    rightTitle: "Dugout",
    leftImg: "/img/work-2.png",
    rightImg: "/img/work-1.png",
    leftTag: "project proposal",
    rightTag: "MOBILE APP",
    hrefLeft: "https://www.figma.com/proto/SbrXU8J1TGrjNRpyW2RlPX/Dugout-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=0-377&viewport=668%2C-72%2C0.02&t=bunlb8cbB1bFfRFd-1&scaling=min-zoom&content-scaling=fixed",
    hrefRight: "https://dugout-ruby.vercel.app/",
  },
  {
    id: "2",
    leftTitle: "The Faec Shop",
    rightTitle: "The Faec Shop",
    leftImg: "/img/work-4.jpg",
    rightImg: "/img/work-3.jpg",
    leftTag: "project proposal",
    rightTag: "website redesign",
    hrefLeft: "https://www.figma.com/proto/DbM7KUP5ysgFmZAHQOe6qD/TheFaecShop-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-8&viewport=668%2C39%2C0.02&t=vczgPiG5qiMp7RIb-1&scaling=min-zoom&content-scaling=fixed",
    hrefRight: "https://team-project-steel-five.vercel.app/",
  },
  {
    id: "3",
    leftTitle: "폐의약품 수거 서비스",
    rightTitle: "폐의약품 수거 서비스",
    leftImg: "/img/work-6.png",
    rightImg: "/img/work-5.jpg",
    leftTag: "project proposal",
    rightTag: "MOBILE APP",
    hrefLeft: "https://www.figma.com/proto/vhpSAJsOxiAt2pxogi5Mo1/%ED%8F%90%EC%9D%98%EC%95%BD%ED%92%88-%EC%88%98%EA%B1%B0%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=0-1822&p=f&viewport=665%2C60%2C0.02&t=3VqMut3YDYpMMFUY-1&scaling=min-zoom&content-scaling=fixed",
    hrefRight: "https://medicine-beryl.vercel.app/",
  },
  {
    id: "4",
    leftTitle: "YStudio",
    rightTitle: "돕다컨시어지",
    leftImg: "/img/work-7.png",
    rightImg: "/img/work-8.png",
    leftTag: "Clone Coding",
    rightTag: "Clone Coding",
    hrefLeft: "https://y-studio-five.vercel.app/",
    hrefRight: "https://dongda-khaki.vercel.app/",
  },
  {
    id: "5",
    leftTitle: "Crew a la mode",
    rightTitle: "대방",
    leftImg: "/img/work-9.png",
    rightImg: "/img/work-10.png",
    leftTag: "Clone Coding",
    rightTag: "Clone Coding",
    hrefLeft: "https://cruelmode.vercel.app/",
    hrefRight: "https://daebang-zeta.vercel.app/",
  },
  // {
  //   id: "6",
  //   leftTitle: "포메인",
  //   rightTitle: "뮤자인",
  //   leftImg: "/img/work-11.png",
  //   rightImg: "/img/work-12.png",
  //   leftTag: "Clone Coding",
  //   rightTag: "Clone Coding",
  //   hrefLeft: "https://poen.vercel.app/",
  //   hrefRight: "https://muzain-topaz.vercel.app/",
  // },
    {
    id: "6",
    leftTitle: "배너디자인",
    rightTitle: "노르딕네스트 리디자인",
    leftImg: "/img/work-13.png",
    rightImg: "/img/work-14.png",
    leftTag: "banner design",
    rightTag: "website redesign",
    hrefLeft: "https://www.figma.com/proto/xC3DM0BJDfSIFV0D4CUrFu/%ED%88%AC%EC%8D%B8-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B0%B0%EB%84%88-%ED%8E%98%EC%9D%B4%EC%A7%80?page-id=2002%3A2&node-id=2002-3&viewport=534%2C512%2C0.09&t=R5vdHvG3WJTKfdXh-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2002%3A3",
    hrefRight: "https://www.figma.com/proto/ktldKVg7P9bFVjBiLjT3SV/%EB%85%B8%EB%A5%B4%EB%94%95%EB%84%A4%EC%8A%A4%ED%8A%B8-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8?page-id=0%3A1&node-id=2001-347&p=f&viewport=469%2C-273%2C0.07&t=vrjev5bqZxD48J9l-1&scaling=min-zoom&content-scaling=fixed",
  },
/*     {
    id: "8",
    leftTitle: "투썸 배너디자인 ",
    rightTitle: "바다 사랑 공모전",
    leftImg: "/img/work-dugout.png",
    rightImg: "/img/work-dugout.png",
    leftTag: "banner design",
    rightTag: "PROJECT VIDEO",
    hrefLeft: "",
    hrefRight: "",
  }, */
];

// ✅ ADD: 모바일용 프로젝트 리스트(위/아래 카드로 사용)
const MOBILE_ITEMS = WORK_ITEMS.flatMap((w) => ([
  {
    id: `${w.id}-left`,
    title: w.leftTitle,
    tag: w.leftTag,
    img: w.leftImg,
    href: w.hrefLeft,
  },
  {
    id: `${w.id}-right`,
    title: w.rightTitle,
    tag: w.rightTag,
    img: w.rightImg,
    href: w.hrefRight,
  },
]));

const PROCESS_ITEMS = [
  {
    id: "ideation",
    label: "IDEATION",
    mini: "[DESIGNING THROUGH BUILDING]",
    descTitle: "생각을 정리하고,\n하나씩 만들어 갑니다.",
    desc:
      "아이디어 구상부터 시작해 레퍼런스, 디자인, 구현까지의 과정을\n정리했습니다. 만들면서 확인하고, 다시 설계하며 완성도를 올립니다.",
    img: "/img/ideation.jpg",
  },
  {
    id: "research",
    label: "RESEARCH",
    mini: "[FINDING CLUES]",
    descTitle: "기준을 찾고,\n방향을 좁힙니다.",
    desc:
      "레퍼런스와 패턴을 수집하고, 좋은 흐름/나쁜 흐름을 분리해\n설계 기준을 잡습니다.",
    img: "/img/research.gif",
  },
  {
    id: "wireframe",
    label: "WIREFRAME",
    mini: "[STRUCTURE FIRST]",
    descTitle: "먼저 구조를 만들고,\n흐름을 확인합니다.",
    desc:
      "정보 구조와 동선을 먼저 만들고, 사용자가 막히는 지점을\n최소화하도록 화면을 다듬습니다.",
    img: "/img/wireframe.gif",
  },
  {
    id: "design",
    label: "DESIGN",
    mini: "[VISUAL SYSTEM]",
    descTitle: "톤을 맞추고,\n디테일로 설득합니다.",
    desc:
      "타이포/그리드/간격 규칙을 정리하고, UI 디테일과 마이크로\n인터랙션으로 완성도를 끌어올립니다.",
    img: "/img/design.gif",
  },
  {
    id: "development",
    label: "DEVELOPMENT",
    mini: "[BUILD & ITERATE]",
    descTitle: "코드로 옮기며\n끝까지 구현합니다.",
    desc:
      "React 기반으로 컴포넌트를 구성하고, GSAP/ScrollTrigger로\n스크롤 경험을 구현하며 반복적으로 개선합니다.",
    img: "/img/development.gif",
  },
];

const PROCESS_DEFAULT = {
  mini: "[DESIGNING THROUGH BUILDING]",
  descTitle: "생각을 정리하고,\n하나씩 만들어 갑니다.",
  desc:
    "아이디어 구상부터 시작해 리서치, 디자인, 구현까지 전 과정을 진행했습니다.\n여러 레퍼런스를 찾아보며 디자인을 구성했고, 직접 구현하는 과정에서\n 부족한 부분은 다시 고민하며 여러 차례 보완했습니다.",
};

export default function Work() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  const [index, setIndex] = useState(0);

  // ✅ Process hover 상태
  const [active, setActive] = useState(null);

  // ✅ 마우스 위치 따라오는 preview 좌표 (processRight 기준)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  // 🟩 CHANGED: 화면 크기 따라 렌더링 분기용
  const [isMobile, setIsMobile] = useState(false); // 🟩 CHANGED

  useLayoutEffect(() => { // 🟩 CHANGED
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []); // 🟩 CHANGED

  const activeItem = useMemo(() => {
    if (!active) return PROCESS_DEFAULT;
    return PROCESS_ITEMS.find((x) => x.id === active) ?? PROCESS_DEFAULT;
  }, [active]);

  // 현재 보여줄 2개(좌/우) 페어
  const pair = useMemo(() => {
    const safe = Math.max(0, Math.min(WORK_ITEMS.length - 1, index));
    return WORK_ITEMS[safe];
  }, [index]);

  // ✅ 모바일용 위/아래 카드
  const topItem = useMemo(() => MOBILE_ITEMS[index] ?? MOBILE_ITEMS[0], [index]);
  const bottomItem = useMemo(
    () => MOBILE_ITEMS[index + 1] ?? MOBILE_ITEMS[index] ?? MOBILE_ITEMS[0],
    [index]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      // ===== 1) 섹션 진입 모션(블러/업/페이드) =====
      const introTargets = gsap.utils.toArray([
        ".workTitle",
        ".workCard",
        ".workDesc",
        ".workCta",
      ]);

      gsap.set(introTargets, {
        opacity: 0,
        y: 26,
        filter: "blur(14px)",
        willChange: "transform, opacity, filter",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 45%",
          scrub: true,
        },
      }).to(introTargets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.06,
        ease: "power3.out",
      });

      // ===== 2) Work 섹션 핀 + 스크롤로 아이템 교체 =====
      const pagesPc = WORK_ITEMS.length; // 🟩 CHANGED (정리)
      const pagesMobile = Math.ceil(MOBILE_ITEMS.length / 2); // 🟩 CHANGED (정리)

      const calcTotalScroll = () => { // 🟩 CHANGED
        const mobileNow = window.matchMedia("(max-width: 900px)").matches;
        const pages = mobileNow ? pagesMobile : pagesPc;
        return window.innerHeight * (pages * 0.35);
      };

      ScrollTrigger.create({
        id: "workPin",
        trigger: section,
        start: "top top",
        end: () => `+=${calcTotalScroll()}`, // 🟩 CHANGED (리사이즈 대응)
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
        const isMobileNow = window.matchMedia("(max-width: 900px)").matches;

        const p = isMobileNow ? pagesMobile : pagesPc;
        const raw = Math.round(self.progress * (p - 1));

        const next = isMobileNow ? raw * 2 : raw;
        setIndex((prev) => (prev === next ? prev : next));
        },
      });

      // ===== 3) 교체될 때 카드 "살짝" 리프레시 모션 =====
      const runSwap = () => {
        const cards = gsap.utils.toArray(".workCardMedia");
        gsap.fromTo(
          cards,
          { opacity: 0.6, filter: "blur(10px)", y: 10 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          }
        );
      };

      window.__workSwap = runSwap;
    }, section);

    return () => {
      delete window.__workSwap;
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window.__workSwap === "function") window.__workSwap();
  }, [index]);

  const handleLinkClick = (e, href) => {
  if (!href || href === "#") {
    e.preventDefault();
  }
};
  
  return (
    <>
<section ref={sectionRef} id="work" className="workSection">
  <div ref={pinRef} className="workPin">
    <div className="workInner">
      <h2 className="workTitle">WORK</h2>

      <div className="workGrid">
        {isMobile ? (
          <>
            <a className="workCard" href={topItem.href} aria-label={topItem.title} target="_blank" onClick={(e) => handleLinkClick(e, topItem.href)}>
              <div className="workCardMedia">
                <img className="workImg" src={topItem.img} alt={topItem.title} draggable="false" />
                <div className="workHoverFrame" aria-hidden="true">
                  <img className="workImg workImgInner" src={topItem.img} alt="" draggable="false" />
                </div>
              </div>
              <div className="workMeta">
                <span className="workMetaLeft">{topItem.title}</span>
                <span className="workMetaRight">{topItem.tag}</span>
              </div>
            </a>

            <a className="workCard" href={bottomItem.href} aria-label={bottomItem.title} target="_blank" onClick={(e) => handleLinkClick(e, bottomItem.href)}>
              <div className="workCardMedia">
                <img className="workImg" src={bottomItem.img} alt={bottomItem.title} draggable="false" />
                <div className="workHoverFrame" aria-hidden="true">
                  <img className="workImg workImgInner" src={bottomItem.img} alt="" draggable="false" />
                </div>
              </div>
              <div className="workMeta">
                <span className="workMetaLeft">{bottomItem.title}</span>
                <span className="workMetaRight">{bottomItem.tag}</span>
              </div>
            </a>
          </>
        ) : (
          <>
            <a className="workCard" href={pair.hrefLeft} aria-label={pair.leftTitle} target="_blank" onClick={(e) => handleLinkClick(e, pair.hrefLeft)}>
              <div className="workCardMedia">
                <img className="workImg" src={pair.leftImg} alt={pair.leftTitle} draggable="false" />
                <div className="workHoverFrame" aria-hidden="true">
                  <img className="workImg workImgInner" src={pair.leftImg} alt="" draggable="false" />
                </div>
              </div>
              <div className="workMeta">
                <span className="workMetaLeft">{pair.leftTitle}</span>
                <span className="workMetaRight">{pair.leftTag}</span>
              </div>
            </a>

            <a className="workCard" href={pair.hrefRight} aria-label={pair.rightTitle} target="_blank" onClick={(e) => handleLinkClick(e, pair.hrefRight)}>
              <div className="workCardMedia">
                <img className="workImg" src={pair.rightImg} alt={pair.rightTitle} draggable="false" />
                <div className="workHoverFrame" aria-hidden="true">
                  <img className="workImg workImgInner" src={pair.rightImg} alt="" draggable="false" />
                </div>
              </div>
              <div className="workMeta">
                <span className="workMetaLeft">{pair.rightTitle}</span>
                <span className="workMetaRight">{pair.rightTag}</span>
              </div>
            </a>
          </>
        )}
      </div>

      <p className="workDesc ko">
        아이디어를 디자인과 기술, 영상으로 풀어내며 기획부터 구현까지 직접 완성한 프로젝트들입니다.
        <br />
        스크롤에 따라 주요 작업이 순서대로 전환됩니다.
      </p>

<HoverPreview imgSrc="/img/soon.avif" className="workCtaWrap">
  <button className="workCta" type="button">
    VIEW ALL WORK
  </button>
</HoverPreview>

      {/* ✅ CHANGED: 모바일도 1920처럼 01~06 표시 */}
      <div className="workProgress" aria-hidden="true">
        {(() => {
          const total = WORK_ITEMS.length; // 항상 6
          const current = isMobile ? Math.floor(index / 2) + 1 : index + 1; // ✅ 모바일 12index → 6페이지로 환산
          const clamped = Math.max(1, Math.min(total, current));
          const progress = clamped / total;

          return (
            <>
              <span>{String(clamped).padStart(2, "0")}</span>
              <span className="workProgressBar">
                <i style={{ transform: `scaleX(${progress})` }} />
              </span>
              <span>{String(total).padStart(2, "0")}</span>
            </>
          );
        })()}
      </div>
    </div>
  </div>
</section>


      {/* Process 섹션은 기존 그대로 */}
      <section className="processSection" aria-label="Portfolio process">
        <div className="processInner">
          <div className="processTopLine" aria-hidden="true">
            <span className="processLine" />
            <span className="processTopLabel">[PORTFOLIO PROCESS]</span>
            <span className="processLine" />
          </div>

          <div className="processGrid">
            <div className="processLeft">
              <div className={`processLeftCard ${active ? "is-active" : ""}`}>
                <div className="processLeftThumb" aria-hidden="true" />
                <h3 className="processLeftTitle ko">{activeItem.descTitle}</h3>
                <p className="processLeftDesc ko">{activeItem.desc}</p>
              </div>
            </div>

            <div
              className="processRight"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPreviewPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => setActive(null)}
            >
              <div className="processMini" aria-hidden="true">
                {activeItem.mini}
              </div>

              <ul className="processList">
                {PROCESS_ITEMS.map((item) => (
                  <li key={item.id} className="processRow">
                    <button
                      type="button"
                      className={`processItemBtn ${active === item.id ? "is-active" : ""}`}
                      onMouseEnter={() => setActive(item.id)}
                      onFocus={() => setActive(item.id)}
                    >
                      <span className="processItemText">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="processBottomMini" aria-hidden="true">
                [BUILT THROUGH IDEATION AND ITERATION]
              </div>

              <div
                className={`processPreview ${active ? "is-show" : ""}`}
                aria-hidden={!active}
                style={{ transform: `translate3d(${previewPos.x}px, ${previewPos.y}px, 0)` }}
              >
                <div className="processPreviewBox">
                  {activeItem && (
                    <img className="processPreviewImg" src={activeItem.img} alt="" draggable="false" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
