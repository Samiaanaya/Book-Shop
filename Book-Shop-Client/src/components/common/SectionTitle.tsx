type TSectionTitle = {
  heading: string;
  subHeading: string;
};

const SectionTitle = ({ heading, subHeading }: TSectionTitle) => {
  return (
    <div className="mx-auto text-center md:w-1/3 my-6">
      <p className="text-yellow-600 mb-2">---{subHeading}---</p>
      <h3 className="text-2xl md:text-4xl uppercase border-y-4 py-3">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
