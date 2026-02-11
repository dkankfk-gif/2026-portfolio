// src/pages/Contact.jsx
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contactSection">
      {/* background */}
      <div className="contactBg" aria-hidden="true">
        {/* ✅ 이미지로 할 거면 img만 남기고 video 지우면 됨 */}
        <video
          className="contactBgMedia"
          src="/img/contact.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        /> 
{/*         <img className="contactBgMedia" src="/img/contact.png" alt="" />
 */}        <div className="contactVignette" />
      </div>

      {/* content */}
      <div className="contactInner">
        {/* LEFT big type */}
        <div className="contactTop">
            <div className="contactLeft">
                <p className="contactBig">DESIGN</p>
                <p className="contactBig">FRONTEND</p>
                <p className="contactBig">PORTFOLIO</p>
            </div>

            {/* RIGHT info */}
            <div className="contactRight">
                <p className="contactTag">[CONTACT]</p>
                <div className="contactInfo">
                    <div className="contactRow">
                        <p className="contactLabel">Email.</p>
                        <p className="contactValue">dkanfkf@gmail.com</p>
                    </div>

                    <div className="contactRow">
                        <p className="contactLabel">Phone.</p>
                        <p className="contactValue">010-9229-0940</p>
                    </div>
                </div>
            </div>
        </div>

    <div className="contactBottom">
        <div className="contactBottomLeft">CONTACT</div>

        <div className="contactBottomCenter">
          <button
            type="button"
            className="contactToTop"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </button>
        </div>

        <div className="contactBottomRight">DESIGN · FRONTEND</div>
        </div>
      </div>
    </section>
  );
}
