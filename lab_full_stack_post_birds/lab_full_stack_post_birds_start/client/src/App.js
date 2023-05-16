import { useState, useEffect } from "react";

import './App.css';

import SightingsForm from "./SightingsForm";
import SightingsGrid from "./SightingsGrid";
import { getSightings, postSighting } from "./SightingService";

function App() {

  const [birdSightings, setBirdSightings] = useState([]);


  useEffect(() => {
    getSightings().then((allSightings) => {
      setBirdSightings(allSightings);
    })
  }, []);

  const addSighting = (sighting) => {
    setBirdSightings([...birdSightings, sighting]);
  }

  const removeSighting = (id) => {
    const sightingsToKeep = birdSightings.filter(sighting => sighting._id !== id)
    setBirdSightings(sightingsToKeep);
  }

  // const updateSighting = (sighting, id) => {
  //   const updatedSightings = [... birdSightings]
  //   const index = updatedSightings.indexOf(sighting)
  //   updatedSightings.splice(index, 1, sighting)
    
  //   birdSightings.(sighting => sighting._id !== id)
  //   setBirdSightings(updatedSighting)
  // }

  return (
    <>
      <SightingsForm addSighting={addSighting} />
      <SightingsGrid sightings={birdSightings} removeSighting={removeSighting}  />
    </>
  );
}

export default App;
