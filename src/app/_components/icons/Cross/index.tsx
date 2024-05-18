type Props = {
  className?: string;
  fill?: string;
};

export const Cross: React.FC<Props> = ({ className, fill = 'none' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={fill}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);
