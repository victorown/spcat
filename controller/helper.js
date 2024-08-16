const helper = {};

helper.getValueOfPilihan = (pilihan) => {
  if (pilihan === undefined) {
    console.error('Pilihan is undefined');
    return 0;
  }
  switch (pilihan) {
    case "Sangat yakin":
      return 1;
    case "Yakin":
      return 0.8;
    case "Cukup yakin":
      return 0.6;
    case "Sedikit yakin":
      return 0.4;
    case "Tidak yakin":
      return 0.2;
    case "Sangat tidak yakin":
      return 0;
    default:
      return 0;
  }
};

module.exports = helper;
