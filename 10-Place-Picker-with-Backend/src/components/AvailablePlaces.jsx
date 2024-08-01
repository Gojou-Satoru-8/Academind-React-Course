import { useEffect, useState } from "react";
import Places from "./Places";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      const response = await fetch("http://localhost:3000/places");
      const data = await response.json();
      setAvailablePlaces(data.places);
      setIsLoading(false);
    })();
  }, []);

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
