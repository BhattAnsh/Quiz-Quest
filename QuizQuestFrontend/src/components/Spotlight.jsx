import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

export const Spotlight = ({ className, fill }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{ top: 0, left: 0 }} // Ensure the SVG is positioned at the top left
    >
      <g filter="url(#filter)">
        {/* Adjust cx and cy to position the ellipse at the top left */}
        <ellipse
          cx="1924.71" // Center of the ellipse in x
          cy="100" // Adjust to move the ellipse down slightly
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.41"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

Spotlight.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
};

Spotlight.defaultProps = {
  className: "",
  fill: "white",
};
