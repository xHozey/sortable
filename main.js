let table = document.getElementById("heroes");
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    handleHeroes(data)
  })

const handleHeroes = (heroes) => {
  document.getElementById('select').addEventListener('change', (val) => {
    if (val.target.value != 'all') {
   let filtred =  heroes.slice(0, parseInt(val.target.value))
  filtred.forEach(hero => {
    let tr = document.createElement("tr");
    let icon = document.createElement("td");
    let img = document.createElement("img");
    img.src = hero.images.xs;
    icon.appendChild(img);
    let name = document.createElement("td");
    let fullname = document.createElement("td");
    let power = document.createElement("td");
    let race = document.createElement("td");
    let gender = document.createElement("td");
    let height = document.createElement("td");
    let weight = document.createElement("td");
    let pob = document.createElement("td");
    let alignment = document.createElement("td");
    name.innerHTML = hero.name;
    fullname.innerHTML = hero.biography.fullName;
    power.innerHTML = Object.entries(hero.powerstats)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    race.innerHTML = hero.appearance.race;
    gender.innerHTML = hero.appearance.gender;
    height.innerHTML = hero.appearance.height[1];
    weight.innerHTML = hero.appearance.weight[1];
    pob.innerHTML = hero.biography.placeOfBirth;
    alignment.innerHTML = hero.biography.alignment;
    tr.appendChild(icon);
    tr.appendChild(name);
    tr.appendChild(fullname);
    tr.appendChild(power);
    tr.appendChild(race);
    tr.appendChild(gender);
    tr.appendChild(height);
    tr.appendChild(weight);
    tr.appendChild(pob);
    tr.appendChild(alignment);
    table.appendChild(tr);
    
  });
}
})

};


