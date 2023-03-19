/* let biler = []; // Global variabel, kendt af alle hvis data skal hentes fra jsonbin
 fetch("https://api.jsonbin.io/b/61f8300d518e5f3b2ab39a7a") // Husk at URL skal passe med json data 
// fetch("js/biler.json") // Eksempel med billiste fra lokal fil. Husk at køre live server.
    .then(function (data) { //støbt i cement
        return data.json(); //støbt i cement
    })                      //støbt i cement
    .then(function (post) {
        biler = post.billiste; // Global variable sat til JSON indhold
    }) */

    //Herunder er json data hardcoded
    let biler = [
        {
            bilmaerke: "Suzuki Swift",
            billede: "billeder/Suzuki.jpeg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Budget",
            personer: "4",
            kufferter: "0",
            tillaeg: "0"
        },
        {
            bilmaerke: "Mazda CX3",
            billede: "billeder/mazda.png",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Mellemklasse",
            personer: "5",
            kufferter: "3",
            tillaeg: "60"
        },
        {
            bilmaerke: "Citroën Grand C4 Picasso",
            billede: "billeder/citroen.png",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Minivan",
            personer: "7",
            kufferter: "4",
            tillaeg: "105"
        },
        {
            bilmaerke: "Citroën Berlingo",
            billede: "billeder/berlingo.jpeg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Mellemklasse",
            personer: "5",
            kufferter: "4",
            tillaeg: "50"
        },
        {
            bilmaerke: "Mazda 6",
            billede: "billeder/mazda6.png",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Mellemklasse",
            personer: "5",
            kufferter: "4",
            tillaeg: "70"
        },
        {
            bilmaerke: "Mazda MX 5 Miata",
            billede: "billeder/mazdamx5miata.png",
            billedtekst: "Billede af udlejningsbil",
            kategori: "mellemklasse",
            personer: "2",
            kufferter: "0",
            tillaeg: "100"
        },
        {
            bilmaerke: "Suzuki Vitara",
            billede: "billeder/vitara.png",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Mellemklasse",
            personer: "5",
            kufferter: "4",
            tillaeg: "70"
        }
    ];

const sektion = document.getElementById('bil_sektion');
const skabelon = document.getElementById('skabelon_output');
const personer = document.getElementById('personer');
const kufferter = document.getElementById('kufferter');
const formular = document.getElementById('formular');
const afhentningsdato = document.getElementById('afhentning');
const afleveringsdato = document.getElementById('aflevering');

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
        sektion.innerHTML = ""; //Nulstiller output-sektion
        for (const bil of biler) {
            if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
                const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
                const klon = skabelon.content.cloneNode(true);
                const bilMM = klon.querySelector(".bilMM");
                const billedtag = klon.querySelector("img");
                const kategori = klon.querySelector(".kategori");
                const antalpersoner = klon.querySelector(".antalpersoner");
                const antalkufferter = klon.querySelector(".antalkufferter");
                const lejeudgift = klon.querySelector(".lejeudgift");
                const link = klon.querySelector("a");

                link.href = `udstyr.html?bil=${bil.bilmaerke}&billede=${bil.billede}&afhentning=${afhentningsdato.value}&aflevering=${afleveringsdato.value}&lejedage=${antaldage}&lejeudgift=${beregnLejeudgift(antaldage, bil.tillaeg)}`;
                billedtag.src = bil.billede;
                billedtag.alt = bil.billedtekst;
                bilMM.textContent = bil.bilmaerke;
                kategori.textContent += bil.kategori;
                antalkufferter.textContent += bil.kufferter;
                antalpersoner.textContent += bil.personer;
                lejeudgift.textContent = "kr. " + beregnLejeudgift(antaldage, bil.tillaeg);
                sektion.appendChild(klon);
            }
        }
    } else {
        sektion.innerText = "Opgiv en afleveringsdato som ligger efter afhentingsdato.";
    }

})

function valideDatoer(afhentningsdato, afleveringsdato) {
    const afhentning = new Date(afhentningsdato);
    const aflevering = new Date(afleveringsdato);
    if (afhentning > aflevering) {
        return false;
    } else {
        return true;
    }
};

function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
    const AFHENTNING = new Date(afhentningsdato);
    const AFLEVERING = new Date(afleveringsdato);
    const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
    const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
    return FORSKELIDAGE;
}

function beregnLejeudgift(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    return LEJEUDGIFT.toFixed(2);
}

