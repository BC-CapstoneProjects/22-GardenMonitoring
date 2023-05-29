import { Auth } from 'aws-amplify';

const plants = [
  {
    id: 0,
    name: 'Succulent',
    type: 'Echeveria',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
    soil: 'Moderately acid (5.6 – 6.0) Slightly acid (6.1 – 6.5) Neutral (6.6 – 7.3) Slightly alkaline (7.4 – 7.8)',
    minColdHard: 'Zone 9b -3.9 °C (25 °F) to -1.1 °C (30 °F)',
    leaves: 'Unusual foliage color, Evergreen',
    sun: 'Partial or Dappled Shade',
    flowers: 'Showy',
    flowerColor: 'Other: Pinkish red',
    bloomSize: 'Under 1"',
    suitableLocations: 'Xeriscapic, Houseplant',
    propMethods: 'Cuttings: Leaf',
    otherMethods: 'Offsets',
    containers: 'Suitable in 1 gallon, Needs excellent drainage in pots',
    link: 'https://garden.org/plants/view/111967/Echeveria-Perle-von-Nurnberg/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 1,
    name: 'Pepppermint',
    type: 'Mentha x piperita',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "success",
    sun: 'Full Sun to Partial Shade',
    leaves: 'Unusual foliage color, Fragrant', 
    flowers: 'Showy, Fragrant',
    suitableLocations: 'Bog gardening',
    propMethods: 'Cuttings: Stem',
    otherMethods: 'Division, Stolons and runners',
    containers: 'Suitable in 1 gallon, Suitable in 3 gallon or larger',
    link: 'https://garden.org/plants/view/144515/Peppermint-Mentha-x-piperita/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 2,
    name: 'Rose',
    type: 'Rosa',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "success",
    sun: 'Full Sun',
    soil: 'Moderately acid (5.6 – 6.0) Slightly acid (6.1 – 6.5) Neutral (6.6 – 7.3) Slightly alkaline (7.4 – 7.8)',
    leaves: 'Deciduous',
    flowers: 'Showy',
    propMethods: 'Cuttings: Stem',
    otherMethods: 'Cuttings: Tip',
    link: 'https://garden.org/plants/view/181506/Roses-Rosa/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 3,
    name: 'Prayer Plant',
    type: 'Goeppertia orbifolia',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "warning",
    sun: 'Partial or Dappled Shade',
    water: 'Mesic',
    soil: 'Moderately acid (5.6 – 6.0) Slightly acid (6.1 – 6.5) Neutral (6.6 – 7.3) Slightly alkaline (7.4 – 7.8)',
    leaves: 'Unusual foliage color, Evergreen, Other: Rounded in shape; upper surface silver and green stripes; lower surface, pale green.',
    flowers: 'Showy',
    suitableLocations: 'Houseplant',
    containers: 'Needs excellent drainage in pots',
    link: 'https://garden.org/plants/view/333848/Prayer-Plant-Goeppertia-orbifolia/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 4,
    name: 'African Daisy',
    type: 'Gerbera',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
    sun: 'Full Sun',
    water: 'Mesic, Dry Mesic',
    soil: 'Slightly acid (6.1 – 6.5) Neutral (6.6 – 7.3)',
    leaves: 'Evergreen',
    flowers: 'Showy, Flagrant',
    flowerTime: 'Spring, Late spring or early summer, Summer, Late summer or early fall, Fall',
    propMethods: 'Cuttings: Stem',
    otherMethods: 'Division',
    containers: 'Suitable in 3 gallon or larger, Needs excellent drainage in pots',
    link: 'https://garden.org/plants/view/712791/African-Daisy-Osteospermum-ecklonis-Serenity-Blue-Eyed-Beauty/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 5,
    name: 'Shasta Daisy',
    type: 'Leucanthemum × superbum',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "warning",
    sun: 'Full Sun, Full Sun to Partial Shade',
    water: 'Mesic, Dry Mesic',
    flowers: 'Showy',
    flowerColor: 'White',
    bloomSize: '2"-3"',
    flowerTime: 'Spring, Summer, Fall',
    suitableLocations: 'Xeriscapic',
    link: 'https://garden.org/plants/view/530761/Shasta-Daisy-Leucanthemum-x-superbum-Daisy-May/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
  {
    id: 6,
    name: 'Peace Lily',
    type: 'Herb',
    sun: 'Partial or Dappled Shade',
    soil: 'Slightly acid (6.1 – 6.5) Neutral (6.6 – 7.3)',
    minColdHard: 'Zone 13 +15.6 °C (60 °F) to +21.1 °C (70 °F)',
    leaves: 'Evergreen',
    flowers: 'Showy',
    flowerColor: 'White, Other: Creamy white spathe, pale yellow spadix.',
    suitableLocations: 'Houseplant',
    propMethods: 'Division',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "error",
    water: 'Mesic',
    containers: 'Needs excellent drainage in pots',
    link: 'https://garden.org/plants/view/119743/Peace-Lily-Spathiphyllum-cannifolium/',  
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',  
  },
  {
    id: 7,
    name: 'Southern Maidenhair Fern',
    type: 'Adiantum capillus-veneris',
    imageSrc: 'http://localhost:9000/images/agm-notfound.png', //'/assets/Succulent.jpg', 
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "success",
    sun: 'Partial or Dappled Shade, Partial Shade to Full Shade',
    water: 'Mesic',
    minColdHard: 'Zone 5b -26.1 °C (-15 °F) to -23.3 °C (-10 °F)',
    leaves: 'Deciduous',
    suitableLocations: 'Terrariums, Bog gardening',
    propMethods: 'Division',
    containers: 'Suitable for hanging baskets, Needs excellent drainage in pots',
    link: 'https://garden.org/plants/view/75129/Southern-Maidenhair-Fern-Adiantum-capillus-veneris/',
    disease: 'N/A',
    probability: 'N/A',
    timestamp: 'N/A',
  },
];

// this function updates the disease, probability, and timestamp for each plant 
async function updatePlantHealth(plants, bucketName) {
  const user = await Auth.currentAuthenticatedUser();

  for (const plant of plants) {
    const response = await fetch(`http://localhost:9000/getScans/${user.username}/${bucketName}/Plant_${plant.id}`);
    const data = await response.json();

    // If there are any scans, update the plant with the most recent scan
    if (data && data[0] && data[0].length > 0) {
      const mostRecentScan = data[0][0];
      plant.disease = mostRecentScan.disease;
      plant.probability = mostRecentScan.probability;
      plant.timestamp = mostRecentScan.time_stamp;
    }
  }

  // Return the updated plants array
  return plants;
}


// this function updates the state of each plant based on it's disease labal
function updatePlantState(plants) {
  for (const plant of plants) {
    switch (plant.disease) {
      case 'Healthy':
        plant.state = "success";
        break;
      case 'Unknown':
        plant.state = "warning";
        break;
      default:
        plant.state = "error";
    }
  }

  // Return the updated plants array
  return plants;
}

// This function takes the plant object as an argument and
// returns a Promise that resolves with the updated imageSrc.
async function updateImageSrc(plant) {
  // List of supported image extensions.
  const extensions = ['.jpg', '.jpeg', '.png', '.avif'];

  // Iterate over each extension.
  for (const ext of extensions) {
    let newImageSrc;
    // Check if plant.imageSrc is a full URL
    if (plant.imageSrc.startsWith('http')) {
      // If it is, use it directly
      newImageSrc = plant.imageSrc;
    } else {
      // If it's not, replace the current extension in imageSrc with the new extension.
      newImageSrc = `http://localhost:9000/images/${plant.imageSrc.replace(/\.\w+$/, ext)}`;
    }

    try {
      // Fetch the image with the updated URL.
      const response = await fetch(newImageSrc);

      // If the response is ok (status 200), update the imageSrc in the plant object.
      if (response.ok) {
        plant.imageSrc = newImageSrc;
        break;
      }
    } catch (error) {
      // If there's an error fetching the image, log the error and continue with the next extension.
      console.error(`Error fetching image with extension ${ext}:`, error);
    }
  }

  // Return the plant object with the updated imageSrc.
  return plant;
}

// This function updates the imageSrc for all plant objects in the plants array.
async function updateAllImageSrcs(plants) {
  // Use Promise.all to wait for all plants' imageSrc to be updated.
  const updatedPlants = await Promise.all(plants.map(updateImageSrc));

  // Return the updated plants array.
  return updatedPlants;
}

// Update the imageSrc for all plants and reassign the updated array to the plants variable.
updateAllImageSrcs(plants).then((updatedPlants) => {
  let plants;
  plants = updatedPlants;
});

export { plants, updatePlantHealth, updatePlantState };