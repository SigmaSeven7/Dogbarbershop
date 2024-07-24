import FlipCard from '@/components/ui/flip-card';
import React from 'react';

interface Props {
    
}

const WhatsIncluded: React.FC<Props> = () => {


    return (
        <section id="services" className="w-full max-w-6xl mb-16">
        <h2 className="text-4xl font-semibold text-white mb-6 text-center">
          מה החבר הפרוותי שלך יקבל אצלנו?
        </h2>
        <div className="grid grid-cols-2 md:flex sm:flex md:justify-around sm:justify-around gap-8 justify-center">
          <FlipCard
            description="טיפול בסיסי כולל אמבטיה, הברשה וקיצוץ בסיסי לחבר הפרוותי שלך."
            image="/dog-1.jpg"
            rotate="y"
            subtitle="מה הוא כולל?"
            title="טיפול בסיסי - מה הוא כולל?"
          />
          <FlipCard
            description="כולל עיסוי, טיפול שמפו מיוחד ותספורת אופנתית."
            image="/dog-2.jpg"
            rotate="y"
            subtitle="מה הוא כולל?"
            title="יום ספא מפנק - מה הוא כולל?"
          />
          <FlipCard
            description="גזירת ציפורניים וטיפול בכריות כפות הרגליים לכפות מאושרות."
            image="/dog-3.jpg"
            rotate="y"
            subtitle="מה הוא כולל?"
            title="טיפול כפות - מה הוא כולל?"
          />
        </div>
      </section>
    );
};

export default WhatsIncluded;