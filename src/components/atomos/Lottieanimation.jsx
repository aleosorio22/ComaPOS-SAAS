import Lottie from "react-lottie";

export function Lottieanimation({alto, ancho, animacion}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animacion,
    }
  return (
      <Lottie options={defaultOptions} height={alto} width={ancho} />
    
  );
}

