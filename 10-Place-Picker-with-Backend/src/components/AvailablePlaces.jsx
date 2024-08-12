import { useEffect, useState } from "react";
import Places from "./Places";
import Error from "./Error";
import { fetchAvailablePlaces } from "../http";
import { sortPlacesByDistance } from "../loc";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 3 ways to load:
    // 1. Using the default fetch.then() way:
    // fetch("http://localhost:3000/places")
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log(data);
    //     setAvailablePlaces(data.places);
    //   });
    // 2. Creating an async function to use async-await syntax inside:
    // const loadPlaces = async () => {
    //   const response = await fetch("http://localhost:3000/places");
    //   const data = await response.json();
    //   setAvailablePlaces(data.places);
    // };
    // loadPlaces();
    // 3. Creating an IIFE:
    (async () => {
      // Try and fetch places:
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();
        // Once places are loaded, sort em based on user's location
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // console.log(pos.coords);
            // const [latitude, longitude] = pos.coords;
            const sortedPlaces = sortPlacesByDistance(places, pos.coords.latitude, pos.coords.longitude);
            setAvailablePlaces(sortedPlaces);
            setIsLoading(false);
          },
          // (err) => console.log("User denied location")
          () => console.log("User denied location")
        );
      } catch (err) {
        console.log(err.message);
        setError({ message: err.message || "Could not load places, please try again later :)" });
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
