import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    image: "./assets/img/slideshow/6.png",
    title: "Khám phá hương thơm mới",
    subtitle: "Bộ sưu tập nước hoa 2025",
    link: "/product-page",
  },
  {
    image: "./assets/img/slideshow/2.jpg",
    title: "Đẳng cấp & Tinh tế",
    subtitle: "Sự lựa chọn hoàn hảo cho bạn",
    link: "/product-page",
  },
  {
    image: "./assets/img/slideshow/4.png",
    title: "Khuyến mãi đặc biệt",
    subtitle: "Giảm giá lên đến 50%",
    link: "/product-page",
  },
];

const Slideshow: React.FC = () => {
  return (
    <section className="mt-4 relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        transitionTime={900}
        emulateTouch
        swipeable
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 left-4 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transform -translate-y-1/2 transition"
            >
              ❮
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 right-4 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transform -translate-y-1/2 transition"
            >
              ❯
            </button>
          )
        }
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative h-[500px] md:h-[650px] w-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-6 opacity-90 animate-fade-in delay-200">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Slideshow;
