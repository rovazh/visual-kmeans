export function button({ text, onClick }) {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
}

const parseCsv = (contents) => {
  const lines = contents.trim().split(/\r?\n/);
  const result = [];
  for (const line of lines) {
    const columns = line.split(",");
    if (columns.length === 2) {
      const col1 = parseFloat(columns[0].trim());
      const col2 = parseFloat(columns[1].trim());
      if (!isNaN(col1) && !isNaN(col2)) {
        result.push([col1, col2]);
      }
    }
  }
  return result;
};

export function csvfileInput({ onLoad }) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "text/csv";
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected. Please choose a file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.addEventListener("load", () => onLoad(parseCsv(reader.result)));
    reader.addEventListener("error", () => console.error(reader.error));
  });
  return fileInput;
}
