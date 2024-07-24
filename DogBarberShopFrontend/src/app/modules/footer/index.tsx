import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
        <div className="container-fluid bg-dark sections-container contact-container" id="contact">
          <div className="row ms-3 me-3">
            <div className="col-md-3"></div>
            <div className="col-12 col-md-6 section-header text-center">
              <h2>צור קשר</h2>
              <p>
                בואו לבקר, התקשרו למידע נוסף או הצטרפו לרשתות החברתיות שלנו כדי
                להכיר אותנו יותר
              </p>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row gx-5 gy-5 contact-items-row text-center">
            <div className="col-12 col-lg-4 contact-item">
              <h3 className="first-service-item">
                <i className="fa-solid fa-door-open" aria-hidden="true"></i>{" "}
                שעות פתיחה
              </h3>
              <p>יום שני - שבת 09:00 - 20:00</p>
              <p>יום ראשון סגור</p>
              <p>מחוץ לשעות הפתיחה בתיאום מראש</p>
            </div>
            <div className="col-12 col-lg-4 contact-item">
              <h3>
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>{" "}
                כתובת
              </h3>
              <p>רחוב מלידן 4A</p>
              <p>פרסטטין</p>
              <p>LL19 9RT</p>
            </div>
            <div className="col-12 col-lg-4 contact-item">
              <h3>
                <i className="fa-solid fa-address-book" aria-hidden="true"></i>{" "}
                צור קשר
              </h3>
              <p className="phone contact-phone">
                טלפון:{" "}
                <a
                  className="txt-color-3"
                  href="tel:01745886609"
                  target="_blank"
                >
                  01745 886609
                </a>
              </p>
              <p className="email-anchor">
                אימייל:{" "}
                <a
                  className="txt-color-3"
                  href="mailto:info@thedoghouse.co.uk"
                  target="_blank"
                >
                  info@thedoghouse.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;