import React from 'react';

const ServicesSection: React.FC = () => {
    return (
        <>
          <span className="anchor" id="services-section"></span>
      <section>
        <div className="container-fluid txt-color-1 sections-container bg-whitesmoke font-semibold p-16 mb-12">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-12 col-md-6 section-header text-center">
              <h2>שירותים</h2>
              <p>
                אנו גאים לדאוג לכל כלב כאילו הוא שלנו. בחרו מתוך מגוון השירותים
                שלנו כדי לפנק את הכלב שלכם
              </p>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row gx-5 gy-5 services-items-row">
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3 className="first-service-item txt-color-1">
                <i className="fa-solid fa-dog" aria-hidden="true"></i> טיפוח מלא
              </h3>
              <p>
                כולל טיפוח ראשוני, שתי שטיפות שמפו, ייבוש, עיצוב גוף מלא, ניקוי
                עיניים ואוזניים וגזירת ציפורניים
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3>
                <i className="fa-solid fa-spa" aria-hidden="true"></i> טיפול ספא
              </h3>
              <p>
                פנקו את הכלב שלכם בטיפול לחות ארגן שמן ובאלם אף וכפות של
                WildWash
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3>
                <i className="fa-solid fa-hands-bubbles" aria-hidden="true"></i>{" "}
                רחצה מהירה
              </h3>
              <p>
                שימוש מלא בכל המתקנים שלנו למשך 30 דקות, כולל אמבט בגובה מלא,
                מייבש מקצועי, מגבות מיקרופייבר ואפילו קולון
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3>
                <i className="fa-solid fa-paw" aria-hidden="true"></i> טיפוח
                כפות וציפורניים
              </h3>
              <p>
                אפשרו למטפחים שלנו לקצוץ את ציפורני הכלב שלכם. אנחנו גם מלטשים
                את הציפורניים כך שהן יהיו מסודרות, חלקות ובטוחות יותר
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3>
                <i className="fa-solid fa-shield-dog" aria-hidden="true"></i>{" "}
                ניקוי אוזניים
              </h3>
              <p>בדיקת אוזניים והסרת שעווה. קיצוץ שיער אוזניים לפי הצורך</p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 service-item">
              <h3>
                <i className="fa-solid fa-bath" aria-hidden="true"></i> אמבטיה
                והברשה
              </h3>
              <p>
                כולל שטיפה עם שני שמפוים, ייבוש, גזירת ציפורניים, ניקוי אוזניים
                והברשה
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
    );
};

export default ServicesSection;