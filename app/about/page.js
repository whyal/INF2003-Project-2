import Card from "../components/Card";

export default function About() {
  return (
    <>
      <div className="w-full bg-slate-300 h-96 my-6 rounded text-white flex justify-center items-center">
        About Page Background
      </div>
      <div className="mx-12 my-24">
        <h2 className="font-bold text-4xl">Our story</h2>
        <p className="py-6">
          iClinic has been proudly serving the community since 2007. Established
          by Dr. Ronald McDonald, our clinic began with a simple vision: to
          provide accessible, high-quality healthcare in a welcoming,
          family-friendly environment. What started as a small, neighborhood
          practice has grown over the years, but our core values remain the
          same. We continue to prioritize personalized care, ensuring that each
          patient feels heard and supported. With a dedicated team of healthcare
          professionals and staff, we've built strong, lasting relationships
          with the families we serve. Over the years, we've expanded our
          services to meet the growing needs of our community, while maintaining
          the personal touch that our patients have come to trust. At iClinic,
          we're honored to be a part of your family's health journey, now and
          for generations to come.
        </p>
      </div>
      <div className="mx-12 my-24">
        <h2 className="font-bold text-2xl my-6">
          Meet our friendly neighborhood doctors!
        </h2>
        <div className="flex wrap">
          <Card drName="John" />
          <Card drName="Mary" />
          <Card drName="Alex" />
          <Card drName="Aaron" />
        </div>
      </div>
    </>
  );
}
