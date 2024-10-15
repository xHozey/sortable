const API =
  "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";
let allSuperheroes = [];
let filteredSuperheroes = [];
let pageSize = 20;
let currentPage = 1;

async function getData() {
  try {
    const resp = await fetch(API);
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await resp.json();
    allSuperheroes = data;
    filteredSuperheroes = allSuperheroes;
    displayPage();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData();

document
  .getElementById("pageSizeSelector")
  .addEventListener("change", function () {
    pageSize =
      this.value === "all"
        ? filteredSuperheroes.length
        : parseInt(this.value, 10);
    currentPage = 1;
    displayPage();
  });

const searchInput = document.getElementById("searchInput");
const container = document.querySelector("#mytable tbody");

function displayPage() {
  container.innerHTML = ""; 
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  console.log(start, end);

  const currentSuperheroes = filteredSuperheroes.slice(start, end); 

  currentSuperheroes.forEach((hero) => {
    const heroRow = document.createElement("tr");
    heroRow.innerHTML = `
          <td><img src="${hero.images.xs}" alt="${hero.name}" width="50"></td>
          <td>${hero.name || "N/A"}</td>
          <td>${hero.biography.fullName || "N/A"}</td>
          <td>${Object.entries(hero.powerstats)
            .map(([key, value]) => `${key}: ${value !== null ? value : "N/A"}`)
            .join("<br>")}</td>
          <td>${hero.appearance.race || "N/A"}</td>
          <td>${hero.appearance.gender || "N/A"}</td>
          <td>${hero.appearance.height[1] || "N/A"}</td>
          <td>${hero.appearance.weight[1] || "N/A"}</td>
          <td>${hero.biography.placeOfBirth || "N/A"}</td>
          <td>${hero.biography.alignment || "N/A"}</td>
        `;
    container.appendChild(heroRow);

    displayPagination();
  });
}

function displayPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(filteredSuperheroes.length / pageSize); 

  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage();
    }
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage();
    }
  });
  paginationContainer.appendChild(nextButton);

  const pageInfo = document.createElement("span");
  pageInfo.innerText = ` Page ${currentPage} of ${totalPages} `;
  paginationContainer.appendChild(pageInfo);
}

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filteredSuperheroes = allSuperheroes.filter(
    (hero) => hero.name.toLowerCase().includes(searchTerm) 
  );
  currentPage = 1;
  displayPage();
});

const nn = () => {
  let th = document.getElementById("name");
  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  displayPage();
};

const fullName = () => {
  let th = document.getElementById("fullname");
  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      if (!a.biography.fullName) {
        return 1;
      }
      if (!b.biography.fullName) {
        return -1;
      }
      return b.biography.fullName.localeCompare(a.biography.fullName);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (!a.biography.fullName) {
        return 1;
      }
      if (!b.biography.fullName) {
        return -1;
      }
      return a.biography.fullName.localeCompare(b.biography.fullName);
    });
  }
  displayPage();
};

const race = () => {
  let th = document.getElementById("race");
  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      if (!b.appearance.race) {
        return -1;
      }
      if (!a.appearance.race) {
        return 1;
      }
      return b.appearance.race.localeCompare(a.appearance.race);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (!b.appearance.race) {
        return -1;
      }
      if (!a.appearance.race) {
        return 1;
      }
      return a.appearance.race.localeCompare(b.appearance.race);
    });
  }
  displayPage();
};

const powerStats = () => {
  let th = document.getElementById("powerstats");
  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      let ares = 0;
      let bres = 0;
      Object.entries(a.powerstats).map(([_, value]) => (ares += value));
      Object.entries(b.powerstats).map(([_, value]) => (bres += value));
      return bres - ares;
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      let ares = 0;
      let bres = 0;
      Object.entries(a.powerstats).map(([_, value]) => (ares += value));
      Object.entries(b.powerstats).map(([_, value]) => (bres += value));
      return ares - bres;
    });
  }
  displayPage();
};

const gender = () => {
  let th = document.getElementById("gender");
  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      if (b.appearance.gender == "-") {
        return -1;
      }
      if (a.appearance.gender == "-") {
        return 1;
      }
      return b.appearance.gender.localeCompare(a.appearance.gender);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (b.appearance.gender == "-") {
        return -1;
      }
      if (a.appearance.gender == "-") {
        return 1;
      }
      return a.appearance.gender.localeCompare(b.appearance.gender);
    });
  }
  displayPage();
};

const heighttt = () => {
  let th = document.getElementById("heigth");
  const isAsc = th.getAttribute("order") === "asc";
  th.setAttribute("order", isAsc ? "desc" : "asc");

  filteredSuperheroes.sort((a, b) => {
    let aHeight;
    let bHeight;

    if (a.appearance.height[1]) {
      aHeight = a.appearance.height[1].split(" ");
    } else {
      aHeight = [null, "cm"];
    }

    if (b.appearance.height[1]) {
      bHeight = b.appearance.height[1].split(" ");
    } else {
      bHeight = [null, "cm"];
    }

    let aHeightValue;
    let bHeightValue;

    if (aHeight[0] !== null) {
      aHeightValue = parseFloat(aHeight[0]);
      if (aHeight[1] === "meters") {
        aHeightValue = aHeightValue * 100;
      }
    } else {
      aHeightValue = null;
    }

    if (bHeight[0] !== null) {
      bHeightValue = parseFloat(bHeight[0]);
      if (bHeight[1] === "meters") {
        bHeightValue = bHeightValue * 100;
      }
    } else {
      bHeightValue = null;
    }

    if (aHeightValue === null || aHeightValue === 0) {
      return 1;
    }

    if (bHeightValue === null || bHeightValue === 0) {
      return -1;
    }

    if (isAsc) {
      return aHeightValue - bHeightValue;
    } else {
      return bHeightValue - aHeightValue;
    }
  });

  displayPage();
};

const weight = () => {
  let th = document.getElementById("weight");
  const parseWeight = (weightStr) => {
    let weightParts;
    if (weightStr) {
      weightParts = weightStr.replace(/,/g, "").split(" ");
    } else {
      weightParts = [null, "kg"];
    }

    let weightValue;
    if (weightParts[0] !== null) {
      weightValue = parseFloat(weightParts[0]);
      if (weightParts[1] === "tons") {
        weightValue *= 1000;
      }
    } else {
      weightValue = null;
    }

    return weightValue;
  };

  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");

    filteredSuperheroes.sort((a, b) => {
      if (a.appearance.weight.length < 2 || b.appearance.weight.length < 2) {
        return 0;
      }
      let aWeight = parseWeight(a.appearance.weight[1]);
      let bWeight = parseWeight(b.appearance.weight[1]);

      if (aWeight === null || aWeight === 0) {
        return 1;
      }

      if (bWeight === null || bWeight === 0) {
        return -1;
      }

      return bWeight - aWeight;
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (a.appearance.weight.length < 2 || b.appearance.weight.length < 2) {
        return 0;
      }
      let aWeight = parseWeight(a.appearance.weight[1]);
      let bWeight = parseWeight(b.appearance.weight[1]);

      if (aWeight === null || aWeight === 0) {
        return 1;
      }

      if (bWeight === null || bWeight === 0) {
        return -1;
      }

      return aWeight - bWeight;
    });
  }

  displayPage();
};

const placeOfBirth = () => {
  let th = document.getElementById("placeofbirth");
  const isInvalidPlace = (place) => place === "-" || !place;

  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      if (
        isInvalidPlace(a.biography.placeOfBirth) &&
        !isInvalidPlace(b.biography.placeOfBirth)
      ) {
        return 1;
      }
      if (
        !isInvalidPlace(a.biography.placeOfBirth) &&
        isInvalidPlace(b.biography.placeOfBirth)
      ) {
        return -1;
      }

      return b.biography.placeOfBirth.localeCompare(a.biography.placeOfBirth);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (
        isInvalidPlace(a.biography.placeOfBirth) &&
        !isInvalidPlace(b.biography.placeOfBirth)
      ) {
        return 1;
      }
      if (
        !isInvalidPlace(a.biography.placeOfBirth) &&
        isInvalidPlace(b.biography.placeOfBirth)
      ) {
        return -1;
      }

      return a.biography.placeOfBirth.localeCompare(b.biography.placeOfBirth);
    });
  }

  displayPage();
};

const alignment = () => {
  let th = document.getElementById("alignment");
  const isInvalidAlignment = (alignment) => !alignment || alignment === "-";

  if (th.getAttribute("order") === "asc") {
    th.setAttribute("order", "desc");
    filteredSuperheroes.sort((a, b) => {
      if (
        isInvalidAlignment(a.biography.alignment) &&
        !isInvalidAlignment(b.biography.alignment)
      ) {
        return 1;
      }
      if (
        !isInvalidAlignment(a.biography.alignment) &&
        isInvalidAlignment(b.biography.alignment)
      ) {
        return -1;
      }
      return b.biography.alignment.localeCompare(a.biography.alignment);
    });
  } else {
    th.setAttribute("order", "asc");
    filteredSuperheroes.sort((a, b) => {
      if (
        isInvalidAlignment(a.biography.alignment) &&
        !isInvalidAlignment(b.biography.alignment)
      ) {
        return 1;
      }
      if (
        !isInvalidAlignment(a.biography.alignment) &&
        isInvalidAlignment(b.biography.alignment)
      ) {
        return -1;
      }
      return a.biography.alignment.localeCompare(b.biography.alignment);
    });
  }

  displayPage();
};
