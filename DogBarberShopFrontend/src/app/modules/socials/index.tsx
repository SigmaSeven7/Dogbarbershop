import React from 'react';

const Socials: React.FC = () => {
    return (
        <div className="container-fluid seperator bg-color-2">
        <div className="row">
          <div className="col social-links">
            <p>
              <a
                className="text-black"
                href="https://www.facebook.com"
                target="_blank"
              >
                <i className="fa-brands fa-facebook text-black"></i>
                <span className="sr-only">פייסבוק</span>
              </a>
              <a
                className="ms-5 ps-5 me-5 pe-5 text-black"
                href="https://www.instagram.com"
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
                <span className="sr-only">אינסטגרם</span>
              </a>
              <a
                className="txt-color-1"
                href="https://www.tiktok.com"
                target="_blank"
              >
                <i className="fa-brands fa-tiktok"></i>
                <span className="sr-only">טיקטוק</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Socials;