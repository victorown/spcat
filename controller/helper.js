const helper = {};

helper.getValueOfPilihan = (pilihan) => {
  if (pilihan === undefined) {
    console.error('Pilihan is undefined');
    return 0;
  }
  let newOptions = pilihan.toLowerCase();
  switch (newOptions) {
    case "sangat yakin":
      return 1;
    case "yakin":
      return 0.8;
    case "cukup yakin":
      return 0.6;
    case "sedikit yakin":
      return 0.4;
    case "tidak yakin":
      return 0.2;
    case "sangat tidak yakin":
      return 0;
    default:
      return 0;
  }
};

module.exports = helper;
