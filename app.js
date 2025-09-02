const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Este navegador no soporta reconocimiento de voz.');
        } else {
            const voz = new SpeechRecognition();
            voz.lang = "es-MX";
            voz.continuous = false; // importante: false para que corte después de cada palabra
            voz.interimResults = false;

            const palabraDiv = document.getElementById("palabra");
            const jugador = document.getElementById("jugador");

            let x = 180, y = 180;
            const paso = 20;

            function actualizarPosicion() {
                jugador.style.left = x + "px";
                jugador.style.top = y + "px";
            }

            voz.onresult = (event) => {
                const palabra = event.results[0][0].transcript.trim().toLowerCase();
                console.log("Palabra reconocida:", palabra);
                palabraDiv.textContent = palabra;

                if (palabra === "iniciar") {
                    jugador.style.display = "block";
                    x = 180; y = 180;
                    actualizarPosicion();
                }
                if (palabra === "detener") {
                    jugador.style.display = "none";
                }
                if (palabra === "izquierda") {
                    x = Math.max(0, x - paso);
                    actualizarPosicion();
                }
                if (palabra === "derecha") {
                    x = Math.min(360, x + paso);
                    actualizarPosicion();
                }
                if (palabra === "arriba") {
                    y = Math.max(0, y - paso);
                    actualizarPosicion();
                }
                if (palabra === "abajo") {
                    y = Math.min(360, y + paso);
                    actualizarPosicion();
                }
            };

            voz.onend = () => {
                // reinicia siempre que quieras que siga escuchando
                if (autoEscucha) voz.start();
            };

            let autoEscucha = false;

            document.getElementById("StartBtn").addEventListener("click", () => {
                autoEscucha = true;
                voz.start();
            });

            document.getElementById("StopBtn").addEventListener("click", () => {
                autoEscucha = false;
                voz.stop();
            });
        }