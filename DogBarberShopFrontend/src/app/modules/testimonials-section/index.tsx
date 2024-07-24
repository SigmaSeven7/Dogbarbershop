import React from 'react';

const TestimonialsSection: React.FC = () => {

    return (
        <>
        <span className="anchor" id="testimonials-section"></span>
        <section className="bg-whitesmoke w-full">
          <div className="container-fluid sections-container testimonials-container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-12 col-md-6 section-header text-center">
                <h2 className="txt-color-1">עדויות</h2>
                <p className="txt-color-1">
                  שמעו מה לקוחותינו הנהדרים וכלביהם חושבים עלינו. שירות הלקוחות
                  הוא בלב העסק שלנו
                </p>
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row gx-5 gy-5 ms-sm-3 me-sm-3 mb-4">
              <article className="col-12 col-md-6">
                <div className="row testimonial-item rounded bg-color-1">
                  {/* הרוחב של העמודה גדול יותר לתמונה במכשירים קטנים יותר כדי לשמור על פרופורציות נכונות ולמנוע חפיפה עם טקסט העדות */}
                  <div className="col-5 col-md-4 mt-3 text-center">
                    <figure className="figure">
                      {/* גודל התמונה וגודל הקובץ הופחתו בהתאם לגודל התמונה בשימוש */}
                      <img
                        src="/rosie-300w.webp"
                        className="figure-img img-fluid rounded-circle"
                        alt="רוזי הקוקפוק השחור מצולמת בגינה שלה"
                      />
                      <figcaption className="figure-caption text-center txt-color-3">
                        רוזי
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-7 col-md-8 testimonial-text pe-3">
                    <h3 className="mt-3">
                      ליה יוז{" "}
                      <span className="testimonial-subtitle">(אמא של רוזי)</span>
                    </h3>
                    <p className="txt-color-2">
                      <strong className="testimonial-strong">שירות מעולה</strong>{" "}
                      גרם לרוזי להרגיש בבית. הפרווה שלה מעולם לא נראתה והריחה כל
                      כך טוב! תודה שדאגתם לה. נחזור שוב בקרוב לפינוק נוסף
                    </p>
                  </div>
                </div>
              </article>
              <article className="col-12 col-md-6 mb-4">
                <div className="row testimonial-item rounded bg-color-1">
                  <div className="col-5 col-md-4 mt-3 text-center">
                    <figure className="figure">
                      <img
                        src="/brandi-300w.webp"
                        className="figure-img img-fluid rounded-circle"
                        alt="ברנדי הקוקפוק השוקולדי יושבת על כיסא ירוק"
                      />
                      <figcaption className="figure-caption text-center txt-color-3">
                        ברנדי
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-7 col-md-8 testimonial-text pe-3">
                    <h3 className="mt-3">
                      אבי המפריז{" "}
                      <span className="testimonial-subtitle">(אמא של ברנדי)</span>
                    </h3>
                    <p className="txt-color-2">
                      שירות מושלם.{" "}
                      <strong className="testimonial-strong">
                        ידידותיים ועוזרים
                      </strong>{" "}
                      מההתחלה. לא יכולתי להרגיש בנוח יותר להשאיר את כלבי לטיפוח.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="row gx-5 gy-5 ms-sm-3 me-sm-3 mb-4">
              <article className="col-12 col-md-6">
                <div className="row testimonial-item rounded bg-color-1">
                  <div className="col-5 col-md-4 mt-3 text-center">
                    <figure className="figure">
                      <img
                        src="/bear-300w.webp"
                        className="figure-img img-fluid rounded-circle"
                        alt="בר נרגע בכיסא הירוק במספרת הכלבים"
                      />
                      <figcaption className="figure-caption text-center txt-color-3">
                        בר
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-7 col-md-8 testimonial-text pe-3">
                    <h3 className="mt-3">
                      רבקה שין{" "}
                      <span className="testimonial-subtitle">(אמא של בר)</span>
                    </h3>
                    <p className="txt-color-2">
                      <strong className="testimonial-strong">ממליצה בחום</strong>{" "}
                      על בית הכלבים. בר חזר הביתה מריח נהדר. הוא אהב את הפינוק.
                      תודה שוב
                    </p>
                  </div>
                </div>
              </article>
              <article className="col-12 col-md-6">
                <div className="row testimonial-item rounded bg-color-1">
                  <div className="col-5 col-md-4 mt-3 text-center">
                    <figure className="figure">
                      <img
                        src="/molly-300w.webp"
                        className="figure-img img-fluid rounded-circle"
                        alt="מולי הספניאל נרגעת בכיסא הירוק במספרת הכלבים"
                      />
                      <figcaption className="figure-caption text-center txt-color-3">
                        מולי
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-7 col-md-8 testimonial-text pe-3">
                    <h3 className="mt-3">
                      קרוליין ריילי{" "}
                      <span className="testimonial-subtitle">(אמא של מולי)</span>
                    </h3>
                    <p className="txt-color-2">
                      הולי הייתה{" "}
                      <strong className="testimonial-strong">
                        מדהימה לחלוטין
                      </strong>{" "}
                      מההתחלה ועד הסוף! היא הקשיבה למה שרציתי והייתה בעלת ידע מלא
                      איך לגזום קוקר ספניאל
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        </>
    );
};

export default TestimonialsSection;