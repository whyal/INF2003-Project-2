import Image from "next/image";
const Card = ({ drName, url }) => {
  return (
    <div className="rounded-lg p-4 w-fit shadow-lg m-4">
      <div className="rounded-full w-48 h-48 bg-slate-300 my-4 overflow-hidden cover flex justify-center items-center">
        <Image className="min-w-80" src={url} />
      </div>
      <h4 className="font-semibold">Dr. {drName}</h4>
    </div>
  );
};

export default Card;
