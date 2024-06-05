export const createDate = (val) => {
  const d = new Date(val);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  return {
    date,
    month,
    year,
  };
};

export const createValidObjectFromJSON = (jsonString) => {
  const regex = /BlogPost\(([^)]+)\)/; // Captures properties within parenthesis
  const match = jsonString.match(regex);

  if (match) {
    const propertiesString = match[1]; // Captured group containing properties
    const cleanString = `{"${propertiesString}"}`; // Create valid JSON string
    const blogPostObject = JSON.parse(cleanString);
    console.log(blogPostObject); // Output: { id: "2", imageLink: "...", title: "...", ... }
    return blogPostObject;
  } else {
    console.error("Invalid JSON format or missing BlogPost object");
  }
};
