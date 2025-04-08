// List of destinations
const destinations = [
    { name: "London", region: "Europe" },
    { name: "Tokyo", region: "Asia" },
    { name: "New York", region: "North America" },
    { name: "Paris", region: "Europe" },
    { name: "Bangkok", region: "Asia" },
    { name: "Toronto", region: "North America" }
  ];
  
  // Generator that can accept a region filter and yield destinations
  function* destinationGenerator(destList) {
    let index = 0;
    let filtered = destList;
  
    while (index < filtered.length) {
      // Yield current destination and wait for a filter
      const filter = yield filtered[index];
  
      if (filter) {
        console.log(`Filtering by region: ${filter}`);
        filtered = destList.filter(d => d.region.toLowerCase() === filter.toLowerCase());
        index = 0;
  
        if (filtered.length === 0) {
          yield { name: "No destinations found", region: "" };
        }
      } else {
        index++;
      }
    }
  
    return "No more destinations!";
  }
  
  // === Simulate usage in console ===
  const gen = destinationGenerator(destinations);
  
  // Step 1: Start generator
  let result = gen.next(); // First yield
  console.log("Destination:", result.value);
  
  // Continue without filter
  result = gen.next(); // Next item
  console.log("Destination:", result.value);
  
  // Apply region filter "Asia"
  result = gen.next("Asia");
  console.log("Filtered Destination:", result.value);
  
  // Continue filtered output
  result = gen.next();
  console.log("Filtered Destination:", result.value);
  
  // Next
  result = gen.next();
  console.log("", result.value);
  
  // Call again
  result = gen.next();
  console.log("Generator Done");