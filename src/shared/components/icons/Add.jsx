const Add = ({ size = 40, color = "#D9D9D9" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="21"
        width="39"
        height="2"
        rx="1"
        transform="rotate(90 21 0)"
        fill={color}
      />
      <rect
        y="18"
        width="40"
        height="2"
        rx="1"
        fill={color}
      />
    </svg>
  );
};

export default Add;
