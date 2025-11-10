const template = `
<p>[OPIS]</p>
<p> </p>
<h2><span style="text-decoration: underline;">[TURNIEJ]</span></h2>
<p><span style="font-size: 24px;">[GRACZ A] <strong>[WYNIK]</strong> [GRACZ B]</span></p>
<p>Data: [DATA]</p>
<p>Etap: [ETAP]</p>
<p style="text-align: center;"> </p>
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
  if (a && b && !isNaN(a) && !isNaN(b)) {
    values["WYNIK"] = `${a}:${b}`;
  } else {
    values["WYNIK"] = "[WYNIK]";
  }

  // zamiana w szablonie
  Object.keys(values).forEach(key => {
    html = html.replaceAll(`[${key}]`, values[key]);
  });

  document.getElementById("output").value = html.trim();
}

document.getElementById("generate").addEventListener("click", generateCode);
