import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);
const handImages = [
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=400",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=400",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400",
  "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=400",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=400",
  "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=400",
];

const App = () => {
  // ============ HERO SLIDER ============
  const heroBgImages = useRef([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [totalBg] = useState(3);
  const currentSlideRef = useRef(null);
  const totalSlidesRef = useRef(null);
  const prevHeroBtn = useRef(null);
  const nextHeroBtn = useRef(null);

  const updateHeroSlide = useCallback(
    (newIndex) => {
      if (newIndex === currentBgIndex) return;
      gsap.to(heroBgImages.current[currentBgIndex], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      heroBgImages.current[currentBgIndex]?.classList.remove("active");
      setCurrentBgIndex(newIndex);
      heroBgImages.current[newIndex]?.classList.add("active");
      gsap.to(heroBgImages.current[newIndex], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
      if (currentSlideRef.current)
        currentSlideRef.current.textContent = `0${newIndex + 1}`;
    },
    [currentBgIndex]
  );

  // ============ DIAMOND ITEMS ============
  const diamondItemsRef = useRef([]);

  // ============ OUR WORKS SLIDER ============
  const worksData = [
    {
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500&auto=format&fit=crop",
      title: "THE ROSELINE RING",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500&auto=format&fit=crop",
      title: "THE ZOE EARRINGS",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop",
      title: "THE Hibiscus Ring II",
      category: "Ring",
    },
    {
      img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=500&auto=format&fit=crop",
      title: "THE CHUBBY HOOPS",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=500&auto=format&fit=crop",
      title: "THE CHUBBY HOOPS",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop",
      title: "THE GOLDEN TOUCH",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=500&auto=format&fit=crop",
      title: "LUXURY PEARLS",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=500&auto=format&fit=crop",
      title: "ROYAL COLLECTION",
      category: "Luxury",
    },
    {
      img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=500&auto=format&fit=crop",
      title: "PREMIUM DIAMOND",
      category: "",
    },
    {
      img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=500&auto=format&fit=crop",
      title: "QUEEN STYLE",
      category: "",
    },
  ];

  const [start, setStart] = useState(0);
  const [sliderHTML, setSliderHTML] = useState("");
  const sliderContainerRef = useRef(null);
  const directionRef = useRef("next");

  const getCardsHTML = useCallback(
    (startIndex) => {
      let html = "";
      for (let i = 0; i < 5; i++) {
        const item = worksData[(startIndex + i) % worksData.length];
        html += `
          <button class="work-card ${i === 2 ? "active-card" : ""}">
            <img src="${item.img}" alt="${item.title}" />
            ${item.category ? `<div class="category-tag">${item.category}</div>` : ""}
            <span>${item.title}</span>
          </button>
        `;
      }
      return html;
    },
    [worksData]
  );

  const animateCards = useCallback(
    (dir) => {
      const cards = sliderContainerRef.current?.querySelectorAll(".work-card");
      if (!cards || cards.length === 0) return;
      directionRef.current = dir;
      gsap.to(cards, {
        opacity: 0,
        x: dir === "next" ? -30 : 30,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          const newStart =
            dir === "next"
              ? (start + 1) % worksData.length
              : (start - 1 + worksData.length) % worksData.length;
          setStart(newStart);
          setSliderHTML(getCardsHTML(newStart));
        },
      });
    },
    [start, getCardsHTML, worksData.length]
  );

  // Update slider HTML when start changes
  useEffect(() => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.innerHTML = getCardsHTML(start);
      const newCards = sliderContainerRef.current.querySelectorAll(".work-card");
      gsap.set(newCards, { opacity: 0, x: directionRef.current === "next" ? 30 : -30 });
      gsap.to(newCards, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      });
    }
  }, [start, getCardsHTML]);

  const goToNext = useCallback(() => animateCards("next"), [animateCards]);
  const goToPrev = useCallback(() => animateCards("prev"), [animateCards]);

  // ============ COLLECTION DATA & READ MORE ============
  const collectionData = [
    {
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
      from: "From : Classic Set 2023",
      heading: "Introducing The <br> ORRA Lesedi La Rona",
      sub: "A RECORD BREAKING JEWEL",
      para: "The 302.37 Carat ORRA Lesedi La Rona Is The Best Highest Colour, Highest Clarity Diamond Ever Certified By The GIA.",
      more: " And The World's Largest Square Emerald Cut Diamond, Expertly Cut And Polished By Graff's World Leading Team Of Gemmologists And Master Polishers.",
    },
    {
      img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1200&auto=format&fit=crop",
      from: "From : Royal Set 2024",
      heading: "The Elegant <br> Diamond Butterfly",
      sub: "LUXURY MASTERPIECE",
      para: "Crafted with exceptional detail and premium diamonds, this collection reflects modern luxury.",
      more: " Inspired by timeless elegance and handcrafted perfection, every detail is polished to absolute brilliance.",
    },
  ];

  const [currentCollection, setCurrentCollection] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const collectionNext = () => {
    setCurrentCollection((prev) => (prev + 1) % collectionData.length);
    setShowMore(false);
  };

  const toggleReadMore = () => setShowMore((prev) => !prev);

  // ============ GSAP SCROLL ANIMATIONS (only once) ============
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".navbar", { y: -80, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".hero-content .tagline", { y: 40, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
      gsap.from(".hero-btns button", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.7 });
      gsap.from(".slider-side", { x: 30, opacity: 0, duration: 0.8, delay: 0.9 });
      gsap.from(".slider-arrows", { x: 30, opacity: 0, duration: 0.8, delay: 1.1 });

      // Diamond section
      gsap.from(".top-cards .diamond-card", {
        scrollTrigger: { trigger: ".diamond-section", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      });
      gsap.from(".diamond-heading .heading-row", {
        scrollTrigger: { trigger: ".diamond-heading", start: "top 75%" },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.3,
      });
      gsap.from(".diamond-item", {
        scrollTrigger: { trigger: ".diamond-slider", start: "top 85%" },
        scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1,
      });

      // Works section
      gsap.from(".works-top p", {
        scrollTrigger: { trigger: ".works-section", start: "top 80%" },
        x: -30, opacity: 0, duration: 0.8,
      });
      gsap.from(".works-top h1", {
        scrollTrigger: { trigger: ".works-section", start: "top 80%" },
        x: 40, opacity: 0, duration: 0.8, delay: 0.2,
      });

      // Collection
      gsap.from(".top-line h1, .top-line p", {
        scrollTrigger: { trigger: ".collection-head", start: "top 75%" },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2,
      });
      gsap.from(".collection-title", {
        scrollTrigger: { trigger: ".collection-head", start: "top 70%" },
        y: 50, opacity: 0, duration: 0.9, delay: 0.3,
      });
      gsap.from(".collection-box", {
        scrollTrigger: { trigger: ".collection-box", start: "top 80%" },
        scale: 0.95, opacity: 0, duration: 1,
      });
      gsap.from(".collection-tags-wrapper", {
        scrollTrigger: { trigger: ".collection-tags-wrapper", start: "top 90%" },
        y: 30, opacity: 0, duration: 0.7,
      });

      // Watch
      gsap.from(".watch-left h1", {
        scrollTrigger: { trigger: ".watch-top", start: "top 80%" },
        x: -40, opacity: 0, duration: 0.8,
      });
      gsap.from(".watch-right h1", {
        scrollTrigger: { trigger: ".watch-top", start: "top 80%" },
        x: 40, opacity: 0, duration: 0.8, delay: 0.2,
      });
      gsap.from(".floating-card", {
        scrollTrigger: { trigger: ".watch-center", start: "top 75%" },
        scale: 0.8, opacity: 0, rotation: 15, duration: 0.9, stagger: 0.2,
      });
      gsap.from(".bg-title", {
        scrollTrigger: { trigger: ".watch-center", start: "top 75%" },
        scale: 0.5, opacity: 0, duration: 1,
      });
      gsap.from(".main-hand", {
        y: 250, opacity: 0, duration: 1.6, ease: "power4.out",
        scrollTrigger: { trigger: ".watch-center", start: "top 75%", toggleActions: "play none none none" },
      });

      // Customers
      gsap.from(".customers-left h1", {
        scrollTrigger: { trigger: ".customers-head", start: "top 80%" },
        y: 60, opacity: 0, duration: 1,
      });
      gsap.from(".customers-right h1", {
        scrollTrigger: { trigger: ".customers-head", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, delay: 0.3,
      });

      // Footer CTA
      gsap.from(".footer-hero-content h2", {
        scrollTrigger: { trigger: ".footer-hero-box", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.7,
      });
      gsap.from(".footer-order-btn", {
        scrollTrigger: { trigger: ".footer-hero-box", start: "top 85%" },
        scale: 0.8, opacity: 0, duration: 0.6, delay: 0.3,
      });
      gsap.from(".newsletter-heading h1", {
        scrollTrigger: { trigger: ".newsletter-section", start: "top 85%" },
        x: -30, opacity: 0, duration: 0.7,
      });
      gsap.from(".newsletter-input-box", {
        scrollTrigger: { trigger: ".newsletter-section", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.7, delay: 0.2,
      });
      gsap.from(".footer-tag", {
        scrollTrigger: { trigger: ".footer-bottom", start: "top 90%" },
        y: 20, opacity: 0, stagger: 0.1, duration: 0.5,
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  // Diamond hover and active floating effect
  useEffect(() => {
    diamondItemsRef.current.forEach((item) => {
      const circle = item?.querySelector(".diamond-circle");
      if (!circle) return;
      if (item.classList.contains("active")) {
        gsap.to(circle, {
          y: -8,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      const enterHandler = () => gsap.to(circle, { scale: 1.08, duration: 0.4, ease: "back.out(1.7)" });
      const leaveHandler = () => gsap.to(circle, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
      item.addEventListener("mouseenter", enterHandler);
      item.addEventListener("mouseleave", leaveHandler);
      return () => {
        item.removeEventListener("mouseenter", enterHandler);
        item.removeEventListener("mouseleave", leaveHandler);
      };
    });
  }, []);

  // Hero slider prev/next
  useEffect(() => {
    if (currentSlideRef.current) currentSlideRef.current.textContent = `0${currentBgIndex + 1}`;
    if (totalSlidesRef.current) totalSlidesRef.current.textContent = `0${totalBg}`;
  }, [currentBgIndex, totalBg]);

  const handleHeroNext = () => {
    const next = (currentBgIndex + 1) % totalBg;
    updateHeroSlide(next);
  };

  const handleHeroPrev = () => {
    const prev = (currentBgIndex - 1 + totalBg) % totalBg;
    updateHeroSlide(prev);
  };

  // ============ JSX ============
  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg">
          {[
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
          ].map((url, i) => (
            <div
              key={i}
              ref={(el) => (heroBgImages.current[i] = el)}
              className={`bg-img ${i === currentBgIndex ? "active" : ""}`}
              style={{ backgroundImage: `url('${url}')` }}
            />
          ))}
        </div>

        <nav className="navbar">
          <div className="logo">ORRA</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">New</a>
            <a href="#">Products</a>
            <a href="#">Our Story</a>
            <a href="#">Contact</a>
            <a href="#">Gifting</a>
          </div>
          <div className="nav-actions">
            <button className="circle-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            <button className="outline-btn">Shop</button>
            <button className="fill-btn">Login</button>
          </div>
        </nav>

        <div className="hero-content">
          <p className="tagline">
            Our young and expert designers design the most exquisite jewelry for you to shine in a special way in the world
          </p>
          <h1 className="hero-title">You deserve the most <br /> unique jewelry</h1>
          <div className="hero-btns">
            <button className="hero-fill-btn">Order Now!</button>
            <button className="hero-outline-btn">See Collection</button>
          </div>
        </div>

        <div className="slider-side">
          <span id="currentSlide" ref={currentSlideRef}>01</span>
          <div className="slider-line"><div className="slider-progress"></div></div>
          <span id="totalSlides" ref={totalSlidesRef}>03</span>
        </div>

        <div className="slider-arrows">
          <button className="arrow-btn" onClick={handleHeroPrev}><i className="fa-solid fa-arrow-left"></i></button>
          <button className="arrow-btn" onClick={handleHeroNext}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>

      {/* DIAMOND SECTION */}
      <section className="diamond-section">
        <div className="top-cards">
          <div className="diamond-card left-card">
            <div className="shape-area">
              <div className="big-circle">✦</div>
              <div className="half-circle">
                <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=400&auto=format&fit=crop" alt="" />
              </div>
              <div className="plus-btn">→</div>
            </div>
            <div className="card-content">
              <p>Make your ring in just 4 <br /> steps</p>
              <h3>Design your own <br /> gemstone ring</h3>
            </div>
          </div>
          <div className="diamond-card right-card">
            <p>Users and Supportive <br /> Community</p>
            <div className="community-row">
              <h2>4.8K</h2>
              <div className="users">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="diamond-heading">
          <div className="heading-row">
            <h1>Shop Diamond</h1>
            <div className="title-actions">
              <button className="arrow-fill">→</button>
              <button className="outline-btn">try it now!</button>
            </div>
          </div>
          <div className="heading-row second-row">
            <p>EXPLORE THE POSSIBILITIES OF TAILORED <br /> CRAFTSMANSHIP AND UNLIMITED <br /> CAPABILITIES</p>
            <h1>by shape</h1>
          </div>
        </div>

        <div className="diamond-slider">
          <div className="line"></div>
          {[
            { shape: "Oval", img: "img/D4.png" },
            { shape: "Cushion", img: "img/D2.png" },
            { shape: "Round", img: "img/D1.png", active: true },
            { shape: "Princess", img: "img/D3.png" },
            { shape: "Pear", img: "img/D5.png" },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (diamondItemsRef.current[i] = el)}
              className={`diamond-item ${item.active ? "active" : ""}`}
            >
              <div className="diamond-circle">
                <img src={item.img} alt={item.shape} />
              </div>
              <span>{item.shape}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OUR WORKS SECTION */}
      <section className="works-section">
        <div className="works-top">
          <p className="works-para">
            ORRA combination of <br /> statement and simplistic style <br /> helps create a look that's as <br /> unique as you are
          </p>
          <h1>OUR WORKS</h1>
        </div>
        <div className="works-slider" id="worksSliderContainer" ref={sliderContainerRef} />
        <div className="works-buttons">
          <button className="works-arrow" onClick={goToPrev}><i className="fa-solid fa-arrow-left"></i></button>
          <button className="works-arrow" onClick={goToNext}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>

      {/* NEW COLLECTION SECTION */}
      <section className="collection-section">
        <div className="collection-head">
          <div className="top-line">
            <h1>NEW</h1>
            <p>
              ORRA's combination of <br /> statement and simplistic style helps <br /> create a look that's as unique as you are.
            </p>
          </div>
          <h1 className="collection-title">COLLECTION</h1>
        </div>
        <div className="collection-box">
          <div className="collection-image">
            <img src={collectionData[currentCollection].img} alt="collection" />
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
            <div className="dot dot4"></div>
          </div>
          <div className="collection-content">
            <div className="collection-top">
              <div className="from-box">
                <span className="mini-logo">✦</span>
                <p>{collectionData[currentCollection].from}</p>
              </div>
              <button className="collection-arrow" onClick={collectionNext}>→</button>
            </div>
            <h2>{collectionData[currentCollection].heading}</h2>
            <h4>{collectionData[currentCollection].sub}</h4>
            <p className="collection-para">
              {collectionData[currentCollection].para}
              {showMore && <span id="moreText">{collectionData[currentCollection].more}</span>}
              <button id="readMoreBtn" onClick={toggleReadMore}>
                {showMore ? " Read Less" : " Read More"}
              </button>
            </p>
            <div className="collection-bottom">
              <div>✦ Expert Analysis</div>
              <div>✦ A Sensational Result</div>
            </div>
          </div>
        </div>
        <div className="collection-line">
          <div className="line-light"></div>
          <div className="line-dark"></div>
        </div>
        <div className="collection-tags-wrapper">
          <div className="collection-info">
            <div className="info-icons">
              <div className="big-star">✺</div>
              <div className="small-star">✦</div>
            </div>
            <p>
              ORRA's combination of <br /> statement and simplistic style helps create <br /> a look that's as unique as you are.
            </p>
          </div>
          <div className="collection-tags">
            {["Classic Set", "The Butterfly", "Wild Flower", "Laurence Graff Signature", "Icon", "Men Jewellery", "Gold Expression", "Our Design"].map((tag) => (
              <button key={tag} className={`tag-btn ${tag === "Our Design" ? "active-tag" : ""}`}>{tag}</button>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH ON YOUR HANDS SECTION */}
      <section className="watch-section">
        <div className="watch-top">
          <div className="watch-left">
            <h1>Watch on</h1>
            <p>WITH THE HELP OF AI, YOU CAN UPLOAD <br /> A PHOTO OF YOUR HAND AND SEE YOUR <br /> RING ON YOUR HAND BEFORE BUYING</p>
          </div>
          <div className="watch-right">
            <div className="watch-actions">
              <div className="circle-group">
                <div className="border-circle"></div>
                <div className="border-circle"></div>
                <button className="watch-arrow">→</button>
              </div>
              <button className="watch-btn">try it now!</button>
            </div>
            <h1>your hands!</h1>
          </div>
        </div>
        <div className="watch-center">
          <h2 className="bg-title">ORRA</h2>
          <div className="hands-grid">
            {handImages.map((img, i) => (
              <img key={i} src={img} alt={`hand-${i}`} />
            ))}
          </div>
          <div className="floating-card left-card-watch">
            <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500&auto=format&fit=crop" alt="" />
          </div>
          <img className="main-hand" src="img/2.png" alt="hand" />
          <div className="floating-card right-card-watch">
            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop" alt="" />
          </div>
        </div>
        <div className="watch-bottom">
          <p>Trends come and go ✨ and style <br /> evolves 💎 it's important to have <br /> pieces of jewelry that are timeless <br /> and look chic despite ever ✍️ <br /> changing fashions</p>
        </div>
      </section>

      {/* CUSTOMERS EXPERIENCES */}
      <section className="customers-section">
        <div className="brands-marquee">
          <div className="marquee-track">
            {["Aronbelin", "Tiffany & Co.", "KERING", "Cartier", "BVLGARI"].concat(["Aronbelin", "Tiffany & Co.", "KERING", "Cartier", "BVLGARI"]).map((brand, i) => (
              <div key={i} className="brand-item"><h3>{brand}</h3><span>✦</span></div>
            ))}
          </div>
        </div>
        <div className="customers-head">
          <div className="customers-left">
            <h1>Customers</h1>
            <p>Our regular customers helped us reach <br /> the best with their good and useful <br /> comments and suggestions.</p>
          </div>
          <div className="customers-right"><h1>Experiences</h1></div>
        </div>
        <div className="testimonial-wrapper">
          <div className="testimonial-track">
            {["Emilie Perry", "Kim Ghazal", "Zahra Mhmdi", "Sara Vilson"].map((name, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-img">
                  <img src={[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
                  ][i]} alt={name} />
                </div>
                <div className="testimonial-content">
                  <p>"The quality of the jewelry is <br /> excellent, I'll buy again"</p>
                  <span>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta-section">
        <div className="footer-hero-box">
          <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop" alt="" />
          <div className="footer-overlay"></div>
          <div className="footer-hero-content">
            <h2>Want to Design For own? <br /> Calm, we can do it!</h2>
            <div className="footer-bg-text">ORRA</div>
            <button className="footer-order-btn">Order Now!</button>
          </div>
        </div>
        <div className="newsletter-section">
          <div className="newsletter-heading">
            <h1>GET The Last Information <br /> From US</h1>
            <div className="newsletter-circles">
              <div className="circle-top">✦</div>
              <div className="circle-bottom"></div>
            </div>
          </div>
          <div className="newsletter-content">
            <div className="newsletter-input-box">
              <input type="email" placeholder="Your Email Here" />
              <button>→</button>
            </div>
            <p>Be the first to know about exciting new <br /> designs, special events, store openings and <br /> much more.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-line"><div className="line-visible"></div></div>
          <div className="footer-bottom-content">
            <p>© 2023, All Right Reserved.</p>
            <div className="footer-tags">
              {["Pinterest", "Facebook", "Twitter", "YouTube", "Instagram"].map((s) => (
                <button key={s} className="footer-tag">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;