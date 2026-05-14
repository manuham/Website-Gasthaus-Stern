// Inline SVG Brand-Mark — stilisierter Stern mit leicht abgerundeten Spitzen
// Fünfzackig, einfarbig, verwendet als Logo in Navbar und Footer

export default function StarLogo({ size = 28, color = '#D4A24C', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fünfzackiger Stern mit leicht abgerundeten Spitzen via cubic bezier */}
      <path
        d="M50 8
           C51.5 8 52.5 9.5 53 11
           L61.8 35.5
           L88 36.8
           C90 36.9 91.5 38.5 91 40.5
           C90.7 41.8 89.8 42.8 88.5 43.5
           L68 58.5
           L75.5 83.5
           C76.2 85.5 75 87.5 73 88
           C71.8 88.3 70.5 87.8 69.5 87
           L50 73
           L30.5 87
           C29.5 87.8 28.2 88.3 27 88
           C25 87.5 23.8 85.5 24.5 83.5
           L32 58.5
           L11.5 43.5
           C10.2 42.8 9.3 41.8 9 40.5
           C8.5 38.5 10 36.9 12 36.8
           L38.2 35.5
           L47 11
           C47.5 9.5 48.5 8 50 8Z"
        fill={color}
        strokeLinejoin="round"
      />
    </svg>
  )
}
