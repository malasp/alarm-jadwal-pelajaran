const SPREADSHEET_ID = "MASUKKAN_SPREADSHEET_ID_KAMU_DI_SINI";
const SHEET_NAME = "JadwalPBM";

let schedule = [];
let lastTriggered = null;

async function fetchSchedule() {
  const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${SHEET_NAME}`;
  try {
    const res = await fetch(url);
    schedule = await res.json();
    document.getElementById("status").textContent = "✅ Jadwal berhasil dimuat.";
  } catch (err) {
    document.getElementById("status").textContent = "❌ Gagal memuat jadwal.";
    console.error(err);
  }
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    `🕒 Waktu sekarang: ${now.toLocaleTimeString()}`;
}

function checkAlarm() {
  const now = new Date();
  const current = now.toTimeString().slice(0, 5); // "HH:MM"

  if (lastTriggered === current) return;

  const match = schedule.find(row => row["Mulai"] === current);
  if (match) {
    document.getElementById("status").textContent =
      `🚨 Mulai pelajaran: ${match["Mata Pelajaran"]}`;
    document.getElementById("alarm").play();
    lastTriggered = current;
  }
}

fetchSchedule();
setInterval(updateClock, 1000);
setInterval(checkAlarm, 30000);
