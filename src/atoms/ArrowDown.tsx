import { SVGProps } from "react";

function ArrowDown({ height = "24px", width = "24px", color = "white" }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5965 11.5703L6.67917 7.86105C6.40185 7.58114 5.00368 6.25139 3.6055 7.5811C2.20724 8.91088 3.60544 10.2406 4.07154 10.6838L9.66442 16.0027C11.0626 17.3324 12.9269 17.3324 14.3252 16.0027C16.7017 13.7427 18.7905 11.652 19.918 10.6838C20.4343 10.2406 21.7823 8.91084 20.3841 7.58111C18.9859 6.25139 17.5876 7.58111 17.1216 8.02435L13.393 11.5703"
        stroke="black"
      />
    </svg>
  );
}

export default ArrowDown;
