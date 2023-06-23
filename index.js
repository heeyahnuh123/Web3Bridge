let conferenceRoomCapacity = 500;
let bedroomCapacity = 4;
let allocatedDevelopers = {
  smartContract: [],
  frontend: [],
  serverSide: []
};
let allocatedFacilitators = [];

function allocateConferenceRoom() {
  if (allocatedFacilitators.length < 1 && getTotalAllocatedDevelopers() < 12) {
    allocatedFacilitators.push("Facilitator");
    alert("Conference room allocated for Facilitator.");
  } else {
    alert("Cannot allocate conference room at the moment.");
  }
}

function allocateBedroom(bedroomNumber) {
  if (getTotalAllocatedDevelopers() >= 12) {
    alert("Cannot allocate more developers. All rooms are occupied.");
    return;
  }

  let developersToAllocate = prompt("Enter developers' names (comma-separated):");
  developersToAllocate = developersToAllocate.split(",").map(dev => dev.trim());

  if (developersToAllocate.length === 4 && validateDevelopers(developersToAllocate)) {
    let bedroom = document.querySelector("#bedroom-" + bedroomNumber);
    bedroom.innerHTML += "<p>" + developersToAllocate.join(", ") + "</p>";
    allocatedDevelopers.smartContract.push(...developersToAllocate.slice(0, 2));
    allocatedDevelopers.frontend.push(developersToAllocate[2]);
    allocatedDevelopers.serverSide.push(developersToAllocate[3]);
  } else {
    alert("Invalid number or skills of developers. Please try again.");
  }
}

function getTotalAllocatedDevelopers() {
  return Object.values(allocatedDevelopers).reduce((total, devs) => total + devs.length, 0);
}

function validateDevelopers(developers) {
  let smartContractCount = 0;
  let frontendCount = 0;
  let serverSideCount = 0;

  developers.forEach(dev => {
    if (allocatedDevelopers.smartContract.includes(dev)) {
      smartContractCount++;
    }
    if (allocatedDevelopers.frontend.includes(dev)) {
      frontendCount++;
    }
    if (allocatedDevelopers.serverSide.includes(dev)) {
      serverSideCount++;
    }
  });

  return (
    smartContractCount <= 2 &&
    frontendCount <= 1 &&
    serverSideCount <= 1 &&
    validateGender(developers)
  );
}

function validateGender(developers) {
  let males = developers.filter(dev => dev.toLowerCase().includes("male"));
  let females = developers.filter(dev => dev.toLowerCase().includes("female"));

  return !(females.length > 0 && males.length > 0);
}
