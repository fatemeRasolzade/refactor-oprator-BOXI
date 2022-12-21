type UploadFileProps = {
  className?: string;
};

const UploadFileIcon = ({ className }: UploadFileProps) => (
  <svg
    className={`text-tomato ${className}`}
    width="76"
    height="76"
    viewBox="0 0 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_8_22890)">
      <path
        d="M50.6654 50.6667L37.9987 38L25.332 50.6667"
        stroke="currentColor"
        strokeWidth="6.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 38V66.5"
        stroke="currentColor"
        strokeWidth="6.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5748 58.237C67.6634 56.5532 70.1033 53.8888 71.5094 50.6643C72.9155 47.4398 73.2078 43.8389 72.3401 40.4298C71.4724 37.0208 69.4942 33.9978 66.7176 31.8379C63.941 29.678 60.5242 28.5043 57.0065 28.502H53.0165C52.058 24.7946 50.2715 21.3527 47.7913 18.4351C45.3111 15.5175 42.2018 13.2002 38.6971 11.6572C35.1924 10.1143 31.3835 9.38595 27.5568 9.52694C23.7301 9.66794 19.9852 10.6746 16.6035 12.4713C13.2219 14.2679 10.2915 16.8078 8.03277 19.9C5.77402 22.9922 4.24565 26.5562 3.56257 30.3241C2.87949 34.0919 3.05947 37.9657 4.08897 41.654C5.11848 45.3423 6.97073 48.7492 9.50647 51.6186"
        stroke="currentColor"
        strokeWidth="6.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50.6654 50.6667L37.9987 38L25.332 50.6667"
        stroke="currentColor"
        strokeWidth="6.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8_22890">
        <rect width="76" height="76" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default UploadFileIcon;
