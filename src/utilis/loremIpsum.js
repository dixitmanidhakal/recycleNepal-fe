// utils/loremIpsum.js
export const generateLoremIpsum = (numLines) => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "; // Add more text as needed
    return Array.from({ length: numLines }, () => loremIpsum).join("\n");
  };
  