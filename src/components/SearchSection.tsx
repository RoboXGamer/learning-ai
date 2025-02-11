import { Property } from "./PropertyDetails";

type SearchSectionProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setProperties: (value: Property[]) => void;
  setIsLoading: (value: boolean) => void;
};

function SearchSection({
  searchInput,
  setSearchInput,
  setProperties,
  setIsLoading,
}: SearchSectionProps) {
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const description = searchInput;
    if (!description) return;

    setIsLoading(true);

    // Send data to parse properties
    const url = "/api/parse-properties";
    const formData = { post: description };

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!responseData.ok) {
      const errorMessage = await responseData.text();
      throw new Error(errorMessage);
    }

    const parsedData = await responseData.json();
    setProperties(parsedData);
    setIsLoading(false);
  };
  return (
    <section>
      <div className="grid relative h-[500px]">
        <img
          className="absolute object-cover w-full h-full"
          src="https://s3-alpha-sig.figma.com/img/d03f/11ce/ed1273b382c9c7a8d49bf004b0fcf08f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bEjjXNGB2CKMH~MnQFJHJiEfkVGtwaJ06U8TAlkB8RUVK8SPuq3DEiYmXIyw6p7-l3Z3keXC7F~mqfprMlIlvQbV~uSpTf8yzsfRxzpgwGW6tZ2zPj~dzvtV0JDorPvFgZgGhkRp-F3ZRhiVrDPXdw0TIvXKh602B0qI17GljVMPkNAYC8dJL1aRCQRfOIHqsRLV3JRrt8mUXzfD1u6cBUP53JXYdUmz9O0IUm1pF2tzwV~yQFZonV5WovSPqZ-tyNjawp1JKGGzClzNYDMUPlGXuozuXUs29A8lsiILXhjlq5eEruaTztEkE8l9~eVI2oehYy4zAFmyi8w5WFGx5Q__"
          alt=""
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Dark overlay */}
        <div className="relative z-10 grid place-content-center">
          <h1 className="sm:text-6xl text-4xl mb-4 font-bold sans-serif text-white">
            Discover Your <span className="text-blue-500">Dream Home</span>
            Today!
          </h1>
          <p className="text-slate-200 text-lg mb-8">
            Explore, Envision, and Make it Yours! Start Your Journey Now.
          </p>
          <div className="relative">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="I am looking for a 3 bedroom house in Seattle in the range of .....!"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 my-10">
            <button
              onClick={() =>
                setSearchInput(
                  "Looking for a 3 bedroom house in Seattle in the starting range of 1000000 to 21000000"
                )
              }
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
              text-sm px-5 py-3 text-center"
            >
              Fill Description
            </button>

            <button
              onClick={handleSubmit}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
              text-sm px-5 py-3 text-center"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
