let conferenceRoomCapacity = 500;
let bedroomCapacity = 4;
let allocatedDevelopers = {
  smartContract: [],
  frontend: [],
  serverSide: []
};
let allocatedFacilitators = [];

function allocateConferenceRoom() {
  if (allocatedFacilitators.length < 1 && getTotalAllocatedDevelopers() < 24) {
    allocatedFacilitators.push("Facilitator");
    document.getElementById("conference-room").textContent = "Conference room allocated for Facilitator.";
  } else {
    document.getElementById("conference-room").textContent = "Cannot allocate conference room at the moment.";
  }
}

function allocateBedroom(bedroomNumber) {
  if (getTotalAllocatedDevelopers() >= 24) {
    alert("Cannot allocate more developers. All rooms are occupied.");
    return;
  }

  let developerName = prompt("Enter developer's name:");
  let skillset = prompt("Enter developer's skillset:");
  let gender = prompt("Enter developer's gender:");

  let developer = `${developerName}, ${skillset}, ${gender}`;

  if (validateDeveloper(developer)) {
    let bedroom = document.querySelector(`#bedroom-${bedroomNumber}`);
    bedroom.innerHTML += `<p>${developer}</p>`;
    assignDeveloperToBedroom(developer, skillset, bedroomNumber);
  } else {
    alert("Invalid developer or incorrect format. Please try again.");
  }
}

function getTotalAllocatedDevelopers() {
  return Object.values(allocatedDevelopers).reduce((total, devs) => total + devs.length, 0);
}

function validateDeveloper(developer) {
  let [_, skillset, gender] = developer.split(", ").map(item => item.trim());

  if (allocatedDevelopers.smartContract.includes(developer) || 
      allocatedDevelopers.frontend.includes(developer) || 
      allocatedDevelopers.serverSide.includes(developer)) {
    return false;
  }

  let sameSkillsetDevelopers = allocatedDevelopers[skillset];
  if (sameSkillsetDevelopers.length >= 3) {
    return false;
  }

  if (gender === "Male") {
    if (sameSkillsetDevelopers.some(dev => dev.includes("Female"))) {
      return false;
    }
  } else if (gender === "Female") {
    if (sameSkillsetDevelopers.some(dev => dev.includes("Male"))) {
      return false;
    }
  }

  return true;
}

function assignDeveloperToBedroom(developer, skillset, bedroomNumber) {
  let developersList = allocatedDevelopers[skillset];
  developersList.push(developer);

  if (developersList.length === 3) {
    let bedroom = document.querySelector(`#bedroom-${bedroomNumber}`);
    bedroom.innerHTML += "<p>No more space, room is full!</p>";
  }
}
