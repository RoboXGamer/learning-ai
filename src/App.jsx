import React, { useState, useEffect } from "react";
import "./App.css";
import PropertiesList from "./components/PropertiesList/PropertiesList.jsx";
const PREFERENCE = {
  LIKED: true,
  DISLIKED: false,
  NO_PREFERENCE: undefined,
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    setProperties(parsedData.slice(0, 12));
    setIsLoading(false);
  };

  const renderProperties = () => (
    <>
      {properties.length > 0 && (
        <h2 className="font-bold text-xl w-full">
          Seattle WA Real Estate & Homes For Sale
        </h2>
      )}
      {properties.length > 0 && (
        <PropertiesList
          properties={properties}
          setRecommendedProperties={setRecommendedProperties}
        />
      )}

      {recommendedProperties.length > 0 && (
        <>
          <h2 className="font-bold text-xl w-full">
            Based on your recommendations
          </h2>

          {/* <PropertiesList properties={recommendedProperties} /> */}

          {recommendedProperties?.map?.((property) => {
            console.log({ property });
            return (
              <div key={property?._id}>
                <h2>{property?._score}</h2>
              </div>
            );
          })}
        </>
      )}
    </>
  );

  return (
    <main className="flex p-4 m-4">
      <div className="mx-auto justify-center items-center m-10 min-h-screen">
        <h1 className="sm:text-6xl text-4xl text-slate-900 mb-10 font-bold sans-serif">
          Search for properties in Seattle
        </h1>

        <textarea
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I am looking for a 3 bedroom single family house in Seattle..."
        />

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

        {isLoading ? (
          <div> Loading </div>
        ) : (
          <>
            <section className="flex flex-row justify-center flex-wrap">
              {renderProperties()}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
