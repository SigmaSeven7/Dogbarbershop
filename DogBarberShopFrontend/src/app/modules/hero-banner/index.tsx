import { Button } from '@/components/ui/button';
import React from 'react';

interface HeroBannerProps {
    handleScrollToBookSection : () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ handleScrollToBookSection }) => {
    return (
        <section id="hero-section">
        <div className="container-fluid text-bg-dark">
          <div className="row hero-row bg-color-1">
            <div className="col-md-6 hero-columns hero-header text-white font-bold">
              <h1>בית הכלבים</h1>
              <h2>טיפוח כלבים מקצועי</h2>
              <Button onClick={handleScrollToBookSection}>קביעת תור</Button>
            </div>
            <div className="col-md-6 hero-columns text-center flex justify-center">
              {/* SRCSET's used to aid page loading (see readme for snippet) */}
              <img
                className="hero-image"
                sizes="(max-width: 576px) 576px, (max-width: 768px) 768px, (min-width: 769px) 769px"
                src="/hero-image-lg.webp"
                srcSet="/hero-image-sm.webp 576w, /hero-image-md.webp 768w, /hero-image-lg.webp 2048w"
                alt="קולי גבולי מטופח"
              />
            </div>
          </div>
        </div>
      </section>
    );
};

export default HeroBanner;