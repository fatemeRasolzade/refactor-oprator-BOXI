interface PrivateCodeElementsProps {
  index: number;
  privateCode: [];
}

const PrivateCodeElements = ({ index, privateCode }: PrivateCodeElementsProps) => {
  return (
    <div key={index} className="centering w-14 h-14 rounded-full border border-tomato text-xl font-bold text-tomato cursor-text">
      {privateCode[index]}
    </div>
  );
};

export default PrivateCodeElements;
