const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const saveButton = document.getElementById("save");
const retryButton = document.getElementById("retry");
const photo = document.getElementById("photo");

const effectSelect = document.getElementById("effect");
const frameSelect = document.getElementById("frame");
const bgColorInput = document.getElementById("bgColor");

// Akses kamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Gagal mengakses kamera!", err);
    });

// Tangkap foto dengan efek & frame
captureButton.addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Set warna background
    ctx.fillStyle = bgColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ambil gambar dari video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Terapkan efek
    if (effectSelect.value === "grayscale") {
        ctx.filter = "grayscale(100%)";
    } else if (effectSelect.value === "sepia") {
        ctx.filter = "sepia(100%)";
    }

    // Tambahkan frame
    if (frameSelect.value === "border") {
        ctx.strokeStyle = "#ff4081";
        ctx.lineWidth = 20;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    } else if (frameSelect.value === "collage") {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, canvas.width / 2, canvas.height / 2);
        ctx.strokeRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
        ctx.strokeRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
        ctx.strokeRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    }

    // Simpan hasil foto
    photo.src = canvas.toDataURL("image/png");

    // Tampilkan tombol Save & Retry
    saveButton.style.display = "inline-block";
    retryButton.style.display = "inline-block";
});

// Fitur save
saveButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = "casidy_photobooth.png";
    link.click();
});

// Fitur retry (ulang foto)
retryButton.addEventListener("click", () => {
    photo.src = "";
    saveButton.style.display = "none";
    retryButton.style.display = "none";
});
