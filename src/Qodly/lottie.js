import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ cloudinaryUrl }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: cloudinaryUrl, // URL from Cloudinary
    });

    return () => anim.destroy(); // Optional clean up for unmounting
  }, [cloudinaryUrl]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;
