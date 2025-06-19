import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface QuizButtonProps {
  children: React.ReactNode;
  icon: LucideIcon;
  color: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number; 
  onClick: () => void;
}
export function QuizButton({
  children,
  onClick,
  color = 'gray',
  textColor = 'text-slate-600',
  icon: IconComponent,
  iconColor = 'text-black/30',
  iconSize = 24,
} : QuizButtonProps)  {
  const getGradientClasses = (baseColor: string, isPressed = false) => {
    switch (baseColor) {
      case 'gray':
        return isPressed
          ? 'from-slate-100 to-slate-200'
          : 'from-slate-200 to-slate-300';
      case 'blue':
        return isPressed
          ? 'from-blue-900 to-blue-700'
          : 'from-slate-200 to-slate-300';
      case 'green':
        return isPressed
          ? 'from-lime-600 to-lime-400'
          : 'from-slate-200 to-slate-300';
      case 'red':
        return isPressed
          ? 'from-red-900 to-red-700'
          : 'from-slate-200 to-slate-300';
      default:
        return isPressed
          ? 'from-gray-100 to-gray-200'
          : 'from-gray-200 to-gray-300';
    }
  };

  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const buttonGradient = getGradientClasses(color, false);
  const buttonGradientPressed = getGradientClasses(color, true);

  return (
    <button
      onClick={() => {
        setHasBeenPressed(true);
        onClick();
        setTimeout(() => {
        setHasBeenPressed(false);
        }, 500);
      }}
      className="
        relative
        w-28 h-28
        rounded-full
        flex items-center justify-center
        group
        perspective-1000  /* Apply perspective to the button container */
        transform-gpu     /* Optimize for GPU acceleration */
      "
    >
      {/* The darker, "base" part of the button */}
      <div
        className={`
          absolute
          opacity-50
          w-full h-full
          rounded-full
          bg-gray-400
          shadow-[0_10px_20px_rgba(0,0,0,0.4)]
          group-active:shadow-[0_5px_10px_rgba(0,0,0,0.3)]
          transition-all duration-150 ease-in-out
          group-active:translate-y-1
          transform-gpu
          transform-origin-center
          rotate-x-6   /* Tilt base slightly back */
          translate-z-[-10px] /* Push base back in 3D space */
        `}
      ></div>

      {/* The main button part (color, text, icon) */}
      <div
        className={`
          absolute
          w-24 h-24
          rounded-full
          bg-gradient-to-br ${hasBeenPressed ? buttonGradientPressed : buttonGradient}
          shadow-[0_5px_10px_rgba(0,0,0,0.3),_inset_0_5px_10px_rgba(255,255,255,0.2)]
          flex flex-col items-center justify-center gap-1
          ${hasBeenPressed ? 'text-white' : textColor} font-extrabold text-md uppercase tracking-widest
          translate-y-[-5px]
          group-hover:translate-y-[-3px]
          group-active:translate-y-0
          group-active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.3),_0_2px_5px_rgba(0,0,0,0.2)]
          transition-all duration-150 ease-in-out
          cursor-pointer
          transform-gpu
          transform-origin-center
          rotate-x-6   /* Tilt main button slightly back, matching base */
          translate-z-10 /* Pull main button forward in 3D space */
          group-active:translate-z-0 /* Move main button back to flat position when pressed */
        `}
      >

        {IconComponent && (
          <IconComponent
            size={iconSize}
            className={`${iconColor} ${children ? 'mb-1' : ''}`}
          />
        )}
        {children && <span className="text-xl leading-none">{children}</span>}
      </div>
    </button>
  );
};


