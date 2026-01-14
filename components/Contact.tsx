"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // Use FormData for cleaner value extraction
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      contactNo: (form.elements.namedItem("contactNo") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("http://localhost:8443/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const txt = await res.text();
      setStatus(txt);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Failed to send message.");
    }
  };

  const clearForm = () => {
    const form = document.getElementById("form") as HTMLFormElement;
    if (form) form.reset();
    setStatus("");
  };

  return (
    <div className="contactContainer">
      <section id="contact">
        <div
          className="background"
          data-aos="fade-down-right"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="container">
            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="TitleBar">{status}</div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>CONTACT</span>
                    <span>ME</span>
                  </div>
                  <div className="app-contact">
                    CONTACT INFO : hello@rcxdev.com
                  </div>
                </div>
                <div className="screen-body-item">
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="app-form">
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          name="name"
                          id="name"
                          placeholder="NAME"
                          required
                        />
                      </div>
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          name="email"
                          id="email"
                          placeholder="EMAIL"
                          required
                        />
                      </div>
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          name="contactNo"
                          id="contactNo"
                          placeholder="CONTACT NO"
                          required
                        />
                      </div>
                      <div className="app-form-group message">
                        <input
                          className="app-form-control"
                          name="message"
                          id="message"
                          placeholder="MESSAGE"
                          required
                        />
                      </div>
                      <div className="app-form-group buttons">
                        <button
                          type="button"
                          className="app-form-button"
                          onClick={clearForm}
                        >
                          RESET
                        </button>
                        <button type="submit" className="app-form-button">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="techstack"
          data-aos="fade-down-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <p className="headingTS">Built Using</p>
          <div className="ts">
            <img src="/assets/html.svg" alt="HTML Logo" title="HTML Logo" loading="lazy" />
            <img src="/assets/css.svg" alt="CSS Logo" title="CSS Logo" loading="lazy" />
            <img src="/assets/sass.svg" alt="Sass Logo" title="Sass Logo" loading="lazy" />
            <img src="/assets/vite.svg" alt="Vite Logo" title="Vite Logo" loading="lazy" />
            <img src="/assets/javascript.svg" alt="Javascript Logo" title="Javascript Logo" loading="lazy" />
            <img src="/assets/tailwind.svg" alt="Tailwindcss Logo" title="Tailwindcss Logo" loading="lazy" />
            <img src="/assets/postcss.svg" alt="Postcss Logo" title="Postcss Logo" loading="lazy" />
          </div>
          <div className="ts">
            <img
              src="/assets/mysql.svg"
              alt="Mysql Logo"
              title="Mysql Logo"
              style={{ width: "70px" }}
              loading="lazy"
            />
            <img src="/assets/Spring_Boot.svg" alt="SpringBoot Logo" title="SpringBoot Logo" loading="lazy" />
            <img src="/assets/java.svg" alt="Java Logo" title="Java Logo" loading="lazy" />
            <img src="/assets/python.svg" alt="Python Logo" title="Python Logo" loading="lazy" />
            <img src="/assets/nginx.svg" alt="Nginx Logo" title="Nginx Logo" loading="lazy" />
            <img src="/assets/apache.svg" alt="Apache Logo" title="Apache Logo" loading="lazy" />
            <img src="/assets/docker.svg" alt="Docker Logo" title="Docker Logo" loading="lazy" />
            <img src="/assets/aws.svg" alt="AWS Logo" title="AWS Logo" loading="lazy" />
            <img src="/assets/cloudflare.svg" alt="CloudFlare Logo" title="CloudFlare Logo" loading="lazy" />
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-links">
          <p>
            Copyright &copy; <span id="year">{new Date().getFullYear()}</span> Rohan Chakravarty. All Rights Reserved.
          </p>
          <a href="https://www.rcxdev.com/legal/privacy" target="_blank">
            Privacy Policy
          </a>
          <a href="https://www.rcxdev.com/legal/terms" target="_blank">
            Terms of Use
          </a>
          <p>India</p>
        </div>
      </footer>
    </div>
  );
}