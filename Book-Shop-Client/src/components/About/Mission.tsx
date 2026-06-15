const Mission = () => {
  return (
    <div className="py-10">
      <div
        className="h-[45vh] md:h-[60vh] lg:h-[80vh] rounded-xl bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: `url("https://i.ibb.co.com/pVF97HT/banner5.jpg")`,
        }}
      >
        <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 md:p-10 text-white space-y-5">
          <h2 className="text-xl md:text-4xl font-semibold text-center">
            Our Mission For The Future
          </h2>
          <p className="text-center">
            Our mission is to make books accessible to everyone, inspiring a
            lifelong love for reading. We strive to connect readers with diverse
            stories that educate, entertain, and empower. As we move forward, we
            embrace innovation while preserving the essence of traditional
            bookstores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
