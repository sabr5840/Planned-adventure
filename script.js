// Node Definitions
const startNode = {
    id: 1,
    title: "Welcome to the Adventure",
    description: "You stand before the entrance to the ancient ruins where the legendary crystal is said to be hidden. The sun is low in the sky, and twilight is approaching. What will you do?",
    choices: [
        { name: "Enter", node: null },
        { name: "Examine the area", node: null },
        { name: "Return home", node: null }
    ]
};

const enterRuins = {
    id: 2,
    title: "Enter the Ruins",
    description: "You cautiously move inside the ruins. The corridors are dark and damp. You notice a smaller path leading to a dark chamber.",
    choices: [
        { name: "Continue forward", node: null },
        { name: "Explore a side path", node: null }
    ]
};

const examineArea = {
    id: 3,
    title: "Examine the Area",
    description: "While examining the area, you find an old map showing a secret entrance to the ruins.",
    choices: [
        { name: "Use the secret entrance", node: null },
        { name: "Ignore the map and enter the main entrance", node: null },
        { name: "Return home with the map", node: null }
    ]
};

const returnHome = {
    id: 4,
    title: "Return Home",
    description: "You decide to return home, ending your adventure early.",
    choices: []
};

const continueForward = {
    id: 5,
    title: "Continue Forward",
    description: "You reach the heart of the ruins and see the crystal in front of you, guarded by an ancient riddle.",
    choices: [
        { name: "Solve the riddle", node: null },
        { name: "Take the crystal by force", node: null }
    ]
};

const exploreSidePath = {
    id: 6,
    title: "Explore a Side Path",
    description: "You follow the narrow side path to a small chamber filled with ancient artifacts.",
    choices: [
        { name: "Take an artifact and return", node: null },
        { name: "Continue through the chamber", node: null }
    ]
};

const useSecretEntrance = {
    id: 7,
    title: "Use the Secret Entrance",
    description: "You use the secret entrance and bypass several traps, leading directly to the crystal room.",
    choices: [
        { name: "Take the crystal", node: null },
        { name: "Further investigate the room", node: null }
    ]
};

const ignoreMap = {
    id: 8,
    title: "Ignore the Map",
    description: "Choosing to trust your instincts, you enter through the main entrance, encountering various challenges.",
    choices: [
        { name: "Continue to the crystal chamber", node: null },
        { name: "Look for another way around", node: null }
    ]
};

const solveRiddle = {
    id: 9,
    title: "Solve the Riddle",
    description: "You solve the ancient riddle, unlocking a hidden compartment below the crystal containing more treasures.",
    choices: [
        { name: "Take the treasures", node: null },
        { name: "Leave the treasures", node: null }
    ]
};

const takeCrystalByForce = {
    id: 10,
    title: "Take the Crystal by Force",
    description: "As you attempt to grab the crystal, traps activate, and the room starts to collapse!",
    choices: [
        { name: "Escape the ruins", node: null },
        { name: "Try to deactivate the traps", node: null }
    ]
};

const takeArtifact = {
    id: 11,
    title: "Take an Artifact",
    description: "You choose a glowing artifact that imbues you with a sense of power.",
    choices: [
        { name: "Use the artifact to find a way out", node: null },
        { name: "Keep the artifact and continue", node: null }
    ]
};

const continueThroughChamber = {
    id: 12,
    title: "Continue Through the Chamber",
    description: "Continuing through the chamber, you find an exit leading to a beautiful, secret garden.",
    choices: [
        { name: "Explore the garden", node: null },
        { name: "Return to the ruins", node: null }
    ]
};

const takeTreasures = {
    id: 13,
    title: "Take the Treasures",
    description: "You collect the treasures, securing enough wealth to ensure your family's future, and leave the ruins.",
    choices: []
};

const leaveTreasures = {
    id: 14,
    title: "Leave the Treasures",
    description: "Deciding that some mysteries are best left alone, you leave the treasures untouched and exit the ruins.",
    choices: []
};

const escapeRuins = {
    id: 15,
    title: "Escape the Ruins",
    description: "You escape the ruins just in time as the structure collapses behind you, grateful to be alive.",
    choices: []
};

// Connecting Nodes
startNode.choices[0].node = enterRuins;
startNode.choices[1].node = examineArea;
startNode.choices[2].node = returnHome;

enterRuins.choices[0].node = continueForward;
enterRuins.choices[1].node = exploreSidePath;

examineArea.choices[0].node = useSecretEntrance;
examineArea.choices[1].node = ignoreMap;
examineArea.choices[2].node = returnHome;

continueForward.choices[0].node = solveRiddle;
continueForward.choices[1].node = takeCrystalByForce;

exploreSidePath.choices[0].node = takeArtifact;
exploreSidePath.choices[1].node = continueThroughChamber;

useSecretEntrance.choices[0].node = takeCrystalByForce;  // Reusing existing node for simplicity
useSecretEntrance.choices[1].node = ignoreMap;  // Logic twist, connects back to another decision

ignoreMap.choices[0].node = continueForward;  // Reconnects to an existing logical node
ignoreMap.choices[1].node = exploreSidePath;  // Provides alternative path back

solveRiddle.choices[0].node = takeTreasures;
solveRiddle.choices[1].node = leaveTreasures;

takeCrystalByForce.choices[0].node = escapeRuins;
takeCrystalByForce.choices[1].node = solveRiddle;  // Allows a second chance to solve the riddle

takeArtifact.choices[0].node = escapeRuins;
takeArtifact.choices[1].node = continueThroughChamber;

continueThroughChamber.choices[0].node = exploreSidePath;  // Circular path for more exploration
continueThroughChamber.choices[1].node = returnHome;

// Initialize and display the start node
function displayNode(node) {
    document.getElementById('nodeTitle').innerText = node.title;
    document.getElementById('nodeDescription').innerText = node.description;

    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';  // Clear previous choices

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.name;
        button.classList.add('choiceButton');
        button.onclick = function() {
            if (choice.node) {
                displayNode(choice.node);
            } else {
                console.log('Ending game');
            }
        };
        choicesContainer.appendChild(button);
    });
}

displayNode(startNode);  // Display the initial node when the page loads or script runs
