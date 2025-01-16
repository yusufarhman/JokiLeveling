// Fungsi untuk menghitung Win Rate
function calculateWinRate() {
  const totalMatches = parseInt(document.getElementById("totalMatches").value);
  const totalWinsPercentage = parseFloat(
    document.getElementById("totalWins").value
  );
  const targetWR = parseInt(document.getElementById("targetWR").value);

  // Validasi input
  if (!totalMatches || totalMatches <= 0) {
    document.getElementById("result").innerHTML =
      '<span class="text-red-500">Total pertandingan harus lebih dari 0</span>';
    return;
  }

  if (
    !totalWinsPercentage ||
    totalWinsPercentage < 0 ||
    totalWinsPercentage > 100
  ) {
    document.getElementById("result").innerHTML =
      '<span class="text-red-500">Win rate saat ini harus di antara 0-100</span>';
    return;
  }

  if (!targetWR || targetWR <= 0 || targetWR > 100) {
    document.getElementById("result").innerHTML =
      '<span class="text-red-500">Masukkan target win rate yang valid (1-100)</span>';
    return;
  }

  // Hitung jumlah kemenangan saat ini
  const totalWins = Math.round((totalWinsPercentage / 100) * totalMatches);

  // Hitung win rate saat ini
  const currentWR = (totalWins / totalMatches) * 100;

  // Cek apakah target sudah tercapai
  if (currentWR >= targetWR) {
    document.getElementById("result").innerHTML = ` 
            <div class="p-4 bg-green-600/20 rounded-lg">
                <p class="text-green-400">Win Rate Anda sudah ${currentWR.toFixed(
                  2
                )}%</p>
                <p class="text-sm mt-2">Selamat! Anda telah mencapai target</p>
            </div>
        `;
    return;
  }

  // Hitung jumlah kemenangan berturut-turut yang diperlukan untuk mencapai target
  const neededWins = calculateRequiredConsecutiveWins(
    totalMatches,
    totalWins,
    targetWR
  );

  // Tampilkan hasil
  document.getElementById("result").innerHTML = `
        <div class="space-y-2 p-4 bg-yellow-500/20 rounded-lg">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center">
                    <p class="text-sm text-gray-400">Win Rate Saat Ini</p>
                    <p class="text-xl font-bold text-yellow-400">${currentWR.toFixed(
                      2
                    )}%</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-400">Target Win Rate</p>
                    <p class="text-xl font-bold text-yellow-400">${targetWR}%</p>
                </div>
            </div>
            <div class="text-center">
                <p class="text-lg">Anda membutuhkan</p>
                <p class="text-3xl font-bold text-yellow-400 my-2">${neededWins}</p>
                <p class="text-lg">kemenangan berturut-turut</p>
            </div>
        </div>
    `;
}

// Fungsi untuk menghitung kemenangan berturut-turut yang diperlukan
function calculateRequiredConsecutiveWins(totalMatches, totalWins, targetWR) {
  // Hitung win rate yang diinginkan dalam bentuk desimal
  const targetWRDecimal = targetWR / 100;

  // Rumus untuk menghitung kemenangan berturut-turut
  const neededWins = Math.ceil(
    (targetWRDecimal * totalMatches - totalWins) / (1 - targetWRDecimal)
  );

  // Pastikan hasilnya tidak negatif
  return Math.max(0, neededWins);
}

const hamburgerBtn = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});
