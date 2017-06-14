window.onload = function() {
    (function() {

        /* Pomocné promněné */
        var povoleneSymboly, slovaNaHadani, vstupOdUzivatele, hadej, hadejTlacitko, jizZadaneSymboly, jizNalezeneSymboly, vystup, zivoty, symboly, pocetZivotu, aktualniSlovo, pocetUhadnutychSymbolu, hlaska, canvas, context;

        /* Definuje se zde zakladni parametry naseho obesence */
        function setup() {
            povoleneSymboly = "abcdefghijklmnopqrstuvwxyz";
            // nastavení počtu životů
            pocetZivotu = 7;
            // množina slov, které můžeme uhádnout
            slovaNaHadani = ["gis", "vsb", "javascript", "ostrava"];
            // hlasky které se zobrazí během prubehu
            hlaska = {
                win: 'Vyhrál jsi!',
                lose: 'Prohrál jsi, ale můžeš to zkusit ještě jednou, možná to příště vyjde! :) Hadané slovo bylo ',
                uhadnuto: ' jsi už použil, vyzkoušej jiné...',
                povoleneSymboly: 'Povolené znaky jsou A-Z'
            };

            jizZadaneSymboly = jizNalezeneSymboly = '';
            pocetUhadnutychSymbolu = 0;

            aktualniSlovo = slovaNaHadani[Math.floor(Math.random() * slovaNaHadani.length)];

            // nastavení prvků z webu do promněných
            vystup = document.getElementById("vystup");
            zivoty = document.getElementById("zivoty");
            vstupOdUzivatele = document.getElementById("symbol");

            zivoty.innerHTML = 'Zbývá ti ještě ' + pocetZivotu + ' životů.';
            vystup.innerHTML = '';

            document.getElementById("symbol").value = '';

            hadejTlacitko = document.getElementById("hadej");
            vstupOdUzivatele.style.display = 'inline';
            hadejTlacitko.style.display = 'inline';

            symboly = document.getElementById("symboly");
            symboly.innerHTML = '<li class="hadane-slovo">Hádané slovo:</li>';

            var symbol, i;
            for (i = 0; i < aktualniSlovo.length; i++) {
                symbol = '<li class="symbol symbol' + aktualniSlovo.charAt(i).toUpperCase() + '">' + aktualniSlovo.charAt(i).toUpperCase() + '</li>';
                symboly.insertAdjacentHTML('beforeend', symbol);
            }

            canvas = document.getElementById("obesenec");
            context = canvas.getContext("2d");
            vycistiCanvas();
            nastavBarvu('#000000');
            nastavTloustku(10);
        }
        /* Zobrazují se hlasky pokud je true je konec hry a vyhral, v opacnem pripade prohral */
        function konecHry(win) {
            if (win) {
                vystup.innerHTML = hlaska.win;
                vystup.classList.remove('chyba', 'varovani', 'win');
                vystup.classList.add('win');
            } else {
                vystup.innerHTML = hlaska.lose + aktualniSlovo.toUpperCase();
                vystup.classList.remove('chyba', 'varovani', 'win');
                vystup.classList.add('chyba');
            }

            vstupOdUzivatele.style.display = hadejTlacitko.style.display = 'none';
            vstupOdUzivatele.value = '';
        }
        window.onload = setup();
        document.getElementById("restart").onclick = setup;

        vstupOdUzivatele.onclick = function() {
            this.value = '';
        };

        function vycistiCanvas() {
            canvas.width = canvas.width;
        };

        function nastavBarvu(color) {
            context.strokeStyle = color;
        };

        function nastavTloustku(width) {
            context.lineWidth = width;
        }

        function vykresliRam() {
            context.beginPath();
            context.moveTo(270, 350);
            context.lineTo(20, 350);
            context.lineTo(70, 350);

            context.lineTo(70, 10);
            context.lineTo(200, 10);
            context.lineTo(200, 50);
            context.stroke();
        };

        function vykresliHlavu() {
            context.beginPath();
            context.arc(200, 100, 50, 0, Math.PI * 2, true);
            context.closePath();
            context.lineWidth = 4;
            context.stroke();
        };

        function vykresliTelo() {
            context.beginPath();
            context.moveTo(200, 150);
            context.lineTo(200, 250);
            context.stroke();
        };

        function vykresliPravouRuku() {
            context.beginPath();
            context.moveTo(200, 170);
            context.lineTo(150, 210);
            context.stroke();
        };

        function vykresliLevouRuku() {
            context.beginPath();
            context.moveTo(200, 170);
            context.lineTo(250, 210);
            context.stroke();
        };

        function vykresliPravouNohu() {
            context.beginPath();
            context.moveTo(200, 250);
            context.lineTo(150, 320);
            context.stroke();
        };

        function vykresliLevouNohu() {
            context.beginPath();
            context.moveTo(200, 250);
            context.lineTo(250, 320);
            context.stroke();
        };

        function vykresliCastObesence(pocetZivotu) {
            switch (pocetZivotu) {
                case 1:
                    vykresliPravouNohu();
                    break;
                case 2:
                    vykresliLevouNohu();
                    break;
                case 3:
                    vykresliPravouRuku();
                    break;
                case 4:
                    vykresliLevouRuku();
                    break;
                case 5:
                    vykresliTelo();
                    break;
                case 6:
                    vykresliHlavu();
                    break;
                case 7:
                    vykresliRam();
                    break;
            }
        }

        document.getElementById('sibenice').onsubmit = function(e) {
            if (e.preventDefault) e.preventDefault();
            vystup.innerHTML = '';
            vystup.classList.remove('chyba', 'varovani');
            hadej = vstupOdUzivatele.value;

            if (hadej) {
                if (povoleneSymboly.indexOf(hadej) > -1) {
                    if ((jizNalezeneSymboly && jizNalezeneSymboly.indexOf(hadej) > -1) || (jizZadaneSymboly && jizZadaneSymboly.indexOf(hadej) > -1)) {
                        vystup.innerHTML = '"' + hadej.toUpperCase() + '"' + hlaska.uhadnuto;
                        vystup.classList.add("varovani");
                    } else if (aktualniSlovo.indexOf(hadej) > -1) {
                        var lettersToShow;
                        lettersToShow = document.querySelectorAll(".symbol" + hadej.toUpperCase());

                        for (var i = 0; i < lettersToShow.length; i++) {
                            lettersToShow[i].classList.add("slovoUhodnuto");
                        }
                        for (var j = 0; j < aktualniSlovo.length; j++) {
                            if (aktualniSlovo.charAt(j) === hadej) {
                                pocetUhadnutychSymbolu += 1;
                            }
                        }

                        jizNalezeneSymboly += hadej;
                        if (pocetUhadnutychSymbolu === aktualniSlovo.length) {
                            konecHry(true);
                        }
                    } else {
                        jizZadaneSymboly += hadej;
                        vykresliCastObesence(pocetZivotu);
                        pocetZivotu--;
                        zivoty.innerHTML = 'Zbývá ti ještě ' + pocetZivotu + ' životů.';
                        if (pocetZivotu === 0) konecHry();
                    }
                } else {
                    vystup.classList.add('chyba');
                    vystup.innerHTML = hlaska.povoleneSymboly;
                }
            } else {
                vystup.classList.add('chyba');
                vystup.innerHTML = hlaska.povoleneSymboly;
            }
            return false;
        };
    }());
}