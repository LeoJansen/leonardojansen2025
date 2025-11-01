import Image from "next/image";

type ServiceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type ServicesProps = {
  items: ServiceItem[];
};

const Services = ({ items }: ServicesProps) => {
  return (
    <section id="services" className="flex h-full w-full">
      <div className="mt-20 grid h-full w-full grid-cols-2 text-[#979797]">
        {items.map((service) => (
          <div
            key={service.title}
            className="flex flex-col items-center justify-center p-10"
          >
            <div className="mb-4 flex rounded-lg border-4 border-[#ac7bb6]">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                width={500}
                height={500}
                className="h-80 w-80 rounded-lg shadow-md"
              />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{service.title}</h2>
            <p className="mt-6 text-lg text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
