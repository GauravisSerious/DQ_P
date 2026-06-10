import { useState, useRef } from "react";
import "./FindingCard.css";

function FindingCard({ title, observation, fix, outcome, text }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Fallbacks for data compatibility
  const displayTitle = title || text || "Audit Finding";
  const displayObservation = observation || text || "No observation details provided.";
  const displayFix = fix || "No recommended fix provided.";
  const displayOutcome = outcome || "No expected outcome details provided.";

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.offsetWidth,
        behavior: "smooth"
      });
      setCurrentSlide(index);
    }
  };

  const handleNext = () => {
    if (currentSlide < 2) {
      scrollToSlide(currentSlide + 1);
    } else {
      scrollToSlide(0); // Restart journey
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      // Only set state if index actually changed to avoid infinite rendering loops
      if (index !== currentSlide && index >= 0 && index <= 2) {
        setCurrentSlide(index);
      }
    }
  };

  const handleWheel = (e) => {
    if (containerRef.current && e.deltaY !== 0) {
      // Translate vertical mouse wheel scroll to horizontal scroll
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY * 1.2;
    }
  };

  const getNextButtonText = () => {
    if (currentSlide === 0) return "See Recommendation";
    if (currentSlide === 1) return "See Business Impact";
    return "Restart Journey";
  };

  return (
    <div className="finding-slider-card">
      {/* Top segmented progress bar */}
      <div className="slider-progress-bar">
        <button 
          className={`progress-segment ${currentSlide >= 0 ? "active" : ""}`}
          onClick={() => scrollToSlide(0)}
          aria-label="Go to Slide 1: Key Finding"
        />
        <button 
          className={`progress-segment ${currentSlide >= 1 ? "active" : ""}`}
          onClick={() => scrollToSlide(1)}
          aria-label="Go to Slide 2: Strategic Recommendation"
        />
        <button 
          className={`progress-segment ${currentSlide >= 2 ? "active" : ""}`}
          onClick={() => scrollToSlide(2)}
          aria-label="Go to Slide 3: Expected Impact"
        />
      </div>

      {/* Main Slide Content Area (Scrollable Row) */}
      <div 
        ref={containerRef}
        className="slider-content-container"
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <div className="slider-slide">
          <span className="slide-badge badge-insight">Key Finding</span>
          <h3 className="slide-title">{displayTitle}</h3>
          <p className="slide-text">{displayObservation}</p>
        </div>

        <div className="slider-slide">
          <span className="slide-badge badge-recommendation">Strategic Recommendation</span>
          <h3 className="slide-title">Recommended Remediation</h3>
          <p className="slide-text">{displayFix}</p>
        </div>

        <div className="slider-slide">
          <span className="slide-badge badge-impact">Expected Impact</span>
          <h3 className="slide-title">Business Value Realization</h3>
          <p className="slide-text">{displayOutcome}</p>
        </div>
      </div>

      {/* Bottom Navigation Area */}
      <div className="slider-navigation">
        <button
          className="slider-nav-btn btn-prev"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Back</span>
        </button>

        <div className="slider-dots-indicator">
          <span 
            className={`dot ${currentSlide === 0 ? "active" : ""}`} 
            onClick={() => scrollToSlide(0)}
            style={{ cursor: "pointer" }}
          />
          <span 
            className={`dot ${currentSlide === 1 ? "active" : ""}`} 
            onClick={() => scrollToSlide(1)}
            style={{ cursor: "pointer" }}
          />
          <span 
            className={`dot ${currentSlide === 2 ? "active" : ""}`} 
            onClick={() => scrollToSlide(2)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <button
          className="slider-nav-btn btn-next"
          onClick={handleNext}
          aria-label={getNextButtonText()}
        >
          <span>{getNextButtonText()}</span>
          {currentSlide < 2 ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default FindingCard;
