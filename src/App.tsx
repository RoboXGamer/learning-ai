import { useState } from "react";
import PropertiesList from "./components/PropertiesList.tsx";
import SearchSection from "./components/SearchSection.tsx";
import { Property } from "./components/PropertyDetails.tsx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PREFERENCE = {
  LIKED: true,
  DISLIKED: false,
  NO_PREFERENCE: undefined,
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SearchSection
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setProperties={setProperties}
        setIsLoading={setIsLoading}
      />
      <main className="flex p-4 m-4">
        {isLoading ? (
          <div> Loading </div>
        ) : (
          <section className="flex flex-row justify-center flex-wrap">
            {properties.length > 0 && (
              <h2 className="font-bold text-xl w-full">
                Seattle WA Real Estate & Homes For Sale
              </h2>
            )}
            <PropertiesList properties={properties} />
          </section>
        )}
      </main>
    </>
  );
}

export default App;
