import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_top section" id="contact">
        <div className="container">
          <p className="section_subtitle" data-reveal>
            Contact Us
          </p>

          <h2 className="h2 section_title" data-reveal>
            Interested in Collaborating or Have a Job Opportunity? Get in Touch!
          </h2>

          <button className="ctbtn_icon contact_modal_btn" data-reveal>
            <img
              src="/images/arrow-forward.svg"
              width={43}
              height={20}
              loading="lazy"
              alt="arrow-forward icon"
            />
          </button>
          {/* Form Element */}
          <div className="contact_form">
            <form method="POST" className="form contact_modal hidden" data-reveal>
              <div className="input_box">
                <div className="input_field field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    placeholder="Ciroma Chukwuma"
                    id="firstName"
                    name="firstName"
                    className="item"
                    autoComplete="off"
                  />
                  <div className="error_txt">First name can't be blank</div>
                </div>
                <div className="input_field field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    placeholder="Adekunle"
                    id="lastName"
                    name="lastName"
                    className="item"
                    autoComplete="off"
                  />
                  <div className="error_txt">Last name can't be blank</div>
                </div>
              </div>
              <div className="input_box">
                <div className="input_field field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="text"
                    placeholder="jinadukarim123@gmail.com"
                    id="email"
                    name="email"
                    className="item"
                    autoComplete="off"
                  />
                  <div className="error_txt email">Email can't be blank</div>
                </div>
                <div className="input_field field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    placeholder="Collaboration Inquiry"
                    id="subject"
                    name="subject"
                    className="item"
                    autoComplete="off"
                  />
                  <div className="error_txt">Subject can't be blank</div>
                </div>
              </div>
              <div className="textarea_field field">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Hey there 👋🏽 Temmytade, I'd like to ..."
                  className="item"
                  autoComplete="off"
                ></textarea>
                <div className="error_txt">Message can't be blank</div>
              </div>
              <button type="submit">Send Message</button>
              <div id="result"></div>
            </form>
          </div>

          <img
            src="/images/footer-1.jpg"
            width={159}
            height={176}
            loading="lazy"
            alt="photography"
            className="abs_img abs_img-1"
            data-reveal
          />

          <img
            src="/images/footer-3.jpg"
            width={265}
            height={275}
            loading="lazy"
            alt="photography"
            className="abs_img abs_img-2"
            data-reveal
          />

          <img
            src="/images/baby/baby_img2.jpg"
            width={303}
            height={272}
            loading="lazy"
            alt="photography"
            className="abs_img abs_img-3"
            data-reveal
          />

          <img
            src="/images/footer-4.jpg"
            width={175}
            height={175}
            loading="lazy"
            alt="photography"
            className="abs_img abs_img-4"
            data-reveal
          />

          <img
            src="/images/footer-shape.svg"
            width={185}
            height={134}
            loading="lazy"
            alt=""
            className="shape"
          />
        </div>
      </div>

      <div className="footer_bottom">
        <div className="container">
          <a href="/" className="logo">
            <img
              src="/images/tb_logo_brown.svg"
              width={40}
              height={40}
              loading="lazy"
              alt="Temmytade home"
            />
          </a>

          <ul className="social_list">
            <li>
              <a
                target="_blank"
                href="https://x.com/iam_temmytade1?t=ZnCRGqENTavJNGxOKEEJnw&s=09"
                className="social_link"
              >
                X.
              </a>
            </li>

            <li>
              <a
                target="_blank"
                href="https://www.behance.net/temmytadebalogun"
                className="social_link"
              >
                Be.
              </a>
            </li>

            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/temitade-balogun-26291517b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="social_link"
              >
                Li.
              </a>
            </li>

            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/share/1FUber2G8p/"
                className="social_link"
              >
                Fa.
              </a>
            </li>

            <li>
              <a
                target="_blank"
                href="https://www.instagram.com/temittade_balogun?igsh=MzlvaHVsM3IwNDg%3D"
                className="social_link"
              >
                Insta.
              </a>
            </li>
          </ul>

          <div className="copyright_dev">
            <p className="copyright">
              &copy; Temmytade Balogun, 2025. All Rights Reserved.
            </p>
            <p className="copyright">
              Made with 🤎 by{" "}
              <a
                href="https://www.linkedin.com/in/ayomide-kayode-b24a22277/"
                className="dev_name"
              >
                Ayomide
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer_bg has_before">
        <img
          src="/images/footer-bg.jpg"
          width={1920}
          height={1135}
          loading="lazy"
          alt="photography"
          className="img_cover"
        />
      </div>
    </footer>
  );
}
