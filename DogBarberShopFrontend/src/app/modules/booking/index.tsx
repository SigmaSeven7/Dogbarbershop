import React from 'react';
import AuthModal from '../auth-modal/index.tsx';


interface BookingProps {
    clientId: string | null;
    session: boolean;
    bookSectionRef: React.RefObject<HTMLDivElement>;
}

const Booking: React.FC<BookingProps> = ({ clientId, session,bookSectionRef }) => {
    return (
        <section
        id="book-section"
        className="w-full max-w-6xl text-center mb-16 anchor"
        ref={bookSectionRef}
      >
        <h2 className="text-4xl font-semibold text-white mb-6">קביעת תורים</h2>
        <p className="mb-4 text-gray-200">קבע תור לחבר הפרוותי שלך עוד היום!</p>
        {!(clientId && session) && (
          <div className="flex flex-col gap-4 justify-center items-center">
            <span className="text-gray-300">
              עלייך להיות משתמש רשום ומחובר לחשבונך על מנת לקבוע תור.
            </span>
            <AuthModal />
          </div>
        )}
      </section>
    );
};



export default Booking;