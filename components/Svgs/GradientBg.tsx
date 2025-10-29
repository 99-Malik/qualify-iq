// components/BackgroundSVG.jsx
const GradientBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg 
        width="1440" 
        height="1080" 
        viewBox="0 0 1440 1080" 
        fill="none" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <g clipPath="url(#clip0_1_368)">
          <rect width="1440" height="1080" fill="white"/>
          <g opacity="0.35" filter="url(#filter0_f_1_368)">
            <ellipse cx="135.813" cy="408.696" rx="135.813" ry="408.696" transform="matrix(0.564011 -0.826979 0.185548 -0.982009 1149 1314.32)" fill="#2563EB"/>
          </g>
          <g opacity="0.43" filter="url(#filter1_f_1_368)">
            <ellipse cx="135.813" cy="408.696" rx="135.813" ry="408.696" transform="matrix(0.264078 -0.965539 -0.144238 -0.988921 -43.1016 1070.6)" fill="#2563EB"/>
          </g>
          <g opacity="0.31" filter="url(#filter2_f_1_368)">
            <ellipse cx="159.511" cy="316.19" rx="159.511" ry="316.19" transform="matrix(0.194583 0.980072 0.198057 -0.981005 118.117 831.336)" fill="#F9A80A"/>
          </g>
          <g opacity="0.43" filter="url(#filter3_f_1_368)">
            <ellipse cx="159.511" cy="316.19" rx="159.511" ry="316.19" transform="matrix(-0.135065 0.990031 0.506621 -0.863095 1379.33 1140.56)" fill="#F9A80A"/>
          </g>
        </g>
        <defs>
          <filter id="filter0_f_1_368" x="966.5" y="156.644" width="669.866" height="1288.03" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="113.573" result="effect1_foregroundBlur_1_368"/>
          </filter>
          <filter id="filter1_f_1_368" x="-362.344" y="-116.867" width="592.316" height="1304.34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="113.573" result="effect1_foregroundBlur_1_368"/>
          </filter>
          <filter id="filter2_f_1_368" x="-194.07" y="-5.88333" width="811.698" height="1366.74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="167.97" result="effect1_foregroundBlur_1_368"/>
          </filter>
          <filter id="filter3_f_1_368" x="1020.38" y="374.291" width="995.179" height="1302.59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="167.97" result="effect1_foregroundBlur_1_368"/>
          </filter>
          <clipPath id="clip0_1_368">
            <rect width="1440" height="1080" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
  
  export default GradientBg;