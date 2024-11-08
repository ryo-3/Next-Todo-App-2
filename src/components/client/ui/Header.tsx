import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="flex">
        <h1 className="text-4xl pt-5 pb-3 rubik-bubbles-regular text-blown">
          Todo List
        </h1>
        <Image
          src="/wood_kirikabu.png"
          alt="切り株"
          width={55}
          height={55}
          priority
          className="h-11 w-14 flex mt-5 ml-2"
        />
      </div>
    </header>
  );
};

export default Header;
