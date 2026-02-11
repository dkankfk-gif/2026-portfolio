import { useEffect, useRef, useState } from "react";
import "./Home.css";

export default function Home() {
  const videoRef = useRef(null);

  // ✅ footer 로테이션(2줄)
  const FOOT_ITEMS = [
    { top: "Structure", bottom: "(Wireframe & Layout)" },
    { top: "Motion", bottom: "(After Effects & Premiere)" },
    { top: "Frontend", bottom: "(React & CSS)" },
    { top: "Interactive Prototype", bottom: "(GSAP & Interaction)" },
    { top: "Iteration", bottom: "(Feedback & Refinement)" },
  ];
  const [footIndex, setFootIndex] = useState(0);

  // ✅ footer 자동 순환
  useEffect(() => {
    const timer = setInterval(() => {
      setFootIndex((prev) => (prev + 1) % FOOT_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let isMetaReady = false;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    // 스크롤 범위를 비디오 재생시간(0~duration)으로 매핑
    const syncToScroll = () => {
      rafId = 0;
      if (!isMetaReady || !video.duration) return;

      const section = document.getElementById("home");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;

      // 섹션 내 진행률(0~1)
      const progress = clamp((-rect.top) / Math.max(1, scrollable), 0, 1);

      // 전체 영상 재생시간에 매핑
      const targetTime = progress * video.duration;

      // 너무 자주/미세하게 바꾸면 버벅일 수 있어 약간 조건
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(syncToScroll);
    };

    const onResize = () => onScroll();

    const onLoadedMeta = () => {
      isMetaReady = true;
      onScroll();
    };

    // iOS/모바일에서 사용자 제스처 후에만 currentTime 반영이 잘 되는 경우 대비
    const unlock = async () => {
      try {
        await video.play();
        video.pause();
      } catch (e) {
        // 무시: 사용자가 아직 인터랙션 안 했을 수 있음
      }
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("mousedown", unlock);
    };

    video.addEventListener("loadedmetadata", onLoadedMeta);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("mousedown", unlock);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("mousedown", unlock);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="home" className="home">
      <div className="homeSticky">
        <div className="videoWrap">
          <div className="videoSticky">
            <div className="videoContainer">
              <video
                ref={videoRef}
                className="videoEl"
                muted
                playsInline
                preload="auto"
                src="/main.mp4"
              />
            </div>
          </div>
        </div>

      <div className="overlay">
        <div className="typoWrap">
          <div className="typeGrid">
            <span className="tile tile-j">J</span>

            <div className="tileGroup tile-in">
              <span className="tile tile-i">I</span>
              <span className="tile tile-n">N</span>
            </div>
            <span className="tile tile-w">M</span>
          </div>
        </div>

        <div className="copyWrap">
          <div className="heroCopy">
            <div className="copyLeft">
              <p className="kicker">A CREATIVE PRACTICE SHAPED BY</p>
              <p className="headline">
                <em>Iteration, Detail, and Discipline</em>
              </p>
            </div>

            <div className="copyRightKo kr">
              <p>
                리서치에서 출발해 시각 시스템을 만들고,
                <br />
                코드로 완성하는 흐름을 중요하게 여깁니다.
                <br />
                반복적인 테스트와 개선을 통해 더 나은 경험을 만들어 갑니다.
              </p>
            </div>

            <div className="copyBottom">
              <p className="smallTitle">DESIGNER WHO CODES</p>
              <p className="smallBody">
                UX and visual design to frontend build,
                <br />
                I craft web experiences through iteration, testing, and detail.
                <br />
                Balancing visual sensibility with engineering,
                <br />
                I create stable and highly responsive interactive experiences.
              </p>
            </div>
          </div>
        </div>
        
        <div className="heroFooter">
            <div className="footLeft">DESIGN • FRONTEND</div>

            {/* ✅ 가운데는 grid에서 auto로 고정 */}
            <div className="footCenter">PORTFOLIO</div>

            {/* ✅ 오른쪽 박스는 폭/높이 고정 + 2줄 */}
            <div className="footRight">
              <div className="footTop">{FOOT_ITEMS[footIndex].top}</div>
              <div className="footBottom">{FOOT_ITEMS[footIndex].bottom}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
