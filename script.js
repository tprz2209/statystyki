const template = `
<p>[OPIS]</p>
<p> </p>
<h2><span style="text-decoration: underline;">[TURNIEJ]</span></h2>
<p><span style="font-size: 24px;">[GRACZ A] <strong>[WYNIK]</strong> [GRACZ B]</span></p>
<p>Data: [DATA], [GODZINA]</p>
<p>Etap: [ETAP]</p>
<p> </p>

<p style="text-align: center;">
[superbet_exact country1="[GRACZ A: KRAJ]" team1="[GRACZ A]" date="[DATA: ISO]" country2="[GRACZ B: KRAJ]" team2="[GRACZ B]" time="[GODZINA]" kurs1="[GRACZ A: KURS]" kursx="1.30" kurs2="[GRACZ B: KURS]" link="https://sprbt.pl/LNDART35"]
</p>

<p> </p>
<h3 style="text-align: center;">Statystyki meczowe</h3>

<figure class="wp-block-table">
<table class="has-fixed-layout">
<thead>
<tr><th> </th><th>[GRACZ A]</th><th>[GRACZ B]</th></tr>
</thead>
<tbody>
<tr><td><strong>Wynik</strong></td><td>[PARTIE: GRACZ A]</td><td>[PARTIE: GRACZ B]</td></tr>
<tr><td><strong>Średnie</strong></td><td>[ŚREDNIA: GRACZ A]</td><td>[ŚREDNIA: GRACZ B]</td></tr>
<tr><td><strong>Podwójne</strong></td><td>[PODWÓJNE: GRACZ A]</td><td>[PODWÓJNE: GRACZ B]</td></tr>
<tr><td><strong>Maksy</strong></td><td>[MAKSY: GRACZ A]</td><td>[MAKSY: GRACZ B]</td></tr>
<tr><td><strong>140+</strong></td><td>[140+: GRACZ A]</td><td>[140+: GRACZ B]</td></tr>
<tr><td><strong>100+</strong></td><td>[100+: GRACZ A]</td><td>[100+: GRACZ B]</td></tr>
<tr><td><strong>Najw. checkout</strong></td><td>[MAX CO: GRACZ A]</td><td>[MAX CO: GRACZ B]</td></tr>
</tbody>
</table>
</figure>

<p><a href="[LINK: TURNIEJ]" target="_blank" rel="noopener"><span style="font-size: 16px;">Wyniki całego turnieju</span></a></p>
<p> </p>
<center>[BLOCKQUOTE]</center>
`;

function convertDateToISO(dateStr) {
  // format DD.MM.YYYY → YYYY-MM-DD
  const parts = dateStr.split(".");
  if (parts.length === 3) {
    const [d, m, y] = parts;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return dateStr;
}

function generateCode() {
  let html = template;
  const inputs = document.querySelectorAll("input[name], textarea[name]");
  const values = {};

  // zbieranie wartości
  inputs.forEach(input => {
    const key = input.name;
    values[key] = input.value.trim() || `[${key}]`;
  });

  // automatyczny wynik
  const a = values["PARTIE: GRACZ A"];
  const b = values["PARTIE: GRACZ B"];
  values["WYNIK"] = (a && b && !isNaN(a) && !isNaN(b)) ? `${a}:${b}` : "[WYNIK]";

  // dodatkowe pole DATA: ISO
  values["DATA: ISO"] = convertDateToISO(values["DATA"]);

  // zamiana w szablonie
  Object.keys(values).forEach(key => {
    html = html.replaceAll(`[${key}]`, values[key]);
  });

  document.getElementById("output").value = html.trim();
}

document.getElementById("generate").addEventListener("click", generateCode);

document.getElementById("copy").addEventListener("click", () => {
  const output = document.getElementById("output").value;

  navigator.clipboard.writeText(output).then(() => {
    const btn = document.getElementById("copy");
  });
});

document.getElementById("clear").addEventListener("click", () => {
  const fieldsToClear = [
    "GODZINA",
    "ETAP",
    "OPIS",
    "BLOCKQUOTE",
    "GRACZ A",
    "GRACZ B",
    "GRACZ A: KRAJ",
    "GRACZ B: KRAJ",
    "GRACZ A: KURS",
    "GRACZ B: KURS",
    "PARTIE: GRACZ A",
    "PARTIE: GRACZ B",
    "ŚREDNIA: GRACZ A",
    "ŚREDNIA: GRACZ B",
    "100+: GRACZ A",
    "100+: GRACZ B",
    "140+: GRACZ A",
    "140+: GRACZ B",
    "MAKSY: GRACZ A",
    "MAKSY: GRACZ B",
    "MAX CO: GRACZ A",
    "MAX CO: GRACZ B",
    "PODWÓJNE: GRACZ A",
    "PODWÓJNE: GRACZ B"
  ];

  fieldsToClear.forEach(name => {
    const field = document.querySelector(`[name="${name}"]`);
    if (field) field.value = "";
  });

  // Czyścimy wygenerowany kod
  document.getElementById("output").value = "";
});
