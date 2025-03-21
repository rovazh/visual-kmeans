export function button({ text, onClick }) {
  const $button = document.createElement("button");
  $button.innerText = text;
  $button.style.marginLeft = "15px";
  $button.addEventListener("click", onClick);
  return $button;
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
  const $input = document.createElement("input");
  $input.type = "file";
  $input.accept = "text/csv";
  $input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected. Please choose a file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.addEventListener("load", () => {
      onLoad(parseCsv(reader.result));
      event.target.value = "";
    });
    reader.addEventListener("error", () => console.error(reader.error));
  });
  return $input;
}

export function numericInput({ min, max, dv, onInput }) {
  const $input = document.createElement("input");
  $input.addEventListener("change", (envent) => {
    const val = envent.target.value;
    if (val < min) {
      $input.value = min;
      return onInput(min);
    }
    if (val > max) {
      $input.value = max;
      return onInput(max);
    }
    onInput(val);
  });
  $input.type = "number";
  $input.min = min;
  $input.max = max;
  $input.value = dv;
  return $input;
}
