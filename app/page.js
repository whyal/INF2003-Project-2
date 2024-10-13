import Image from "next/image";
import location from "../public/location.png";
import nurse from "../public/home-2.jpg";
import landing from "../public/landing.png";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="w-full bg-slate-300 h-96 my-6 rounded text-white flex justify-center items-center overflow-hidden">
        <Image src={landing} />
      </div>
      <div className="mx-12 my-24">
        <h2 className="font-bold text-4xl">Welcome to iClinic</h2>
        <p className="py-6">
          At iClinic, we provide personalized, compassionate care for the entire
          family. From routine checkups to specialized services, our experienced
          team is here to support your health at every stage of life. As a proud
          part of the community, we prioritize your well-being and aim to make
          every visit as comfortable as possible. You're not just a patient—
          <span className="font-semibold">
            You're family. Your Health. Our Priority.
          </span>
        </p>
      </div>
      <div className="mx-12 my-24 flex justify-center items-center">
        <h3 className="font-bold text-3xl w-1/2">
          New to our clinic? Head to our location just outside of Punggol MRT!
        </h3>
        <div className="rounded-lg w-[450px] overflow-hidden shadow-lg">
          <Image alt="Location" src={location} />
        </div>
      </div>
      <div className="mx-12 my-24 flex justify-center items-center">
        <div className="rounded-lg w-[450px] overflow-hidden shadow-lg">
          <Image alt="Location" src={nurse} />
        </div>
        <div className="m-8 flex flex-col items-center">
          <h3 className="font-bold text-3xl my-6">
            Already part of the family?
          </h3>
          <Link href="/login">
            <button className="rounded-lg shadow-lg py-2 px-6 text-xl font-semibold bg-indigo-950 text-white w-fit hover:bg-indigo-900">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
