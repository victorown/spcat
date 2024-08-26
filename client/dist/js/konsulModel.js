
const answers = [
    { bobot: 0, pilihan: 'Sangat tidak yakin' },
    { bobot: 0.2, pilihan: 'Tidak yakin' },
    { bobot: 0.4, pilihan: 'Sedikit yakin' },
    { bobot: 0.6, pilihan: 'Cukup yakin' },
    { bobot: 0.8, pilihan: 'Yakin' },
    { bobot: 1, pilihan: 'Sangat yakin' }
];

const questions = [
    {
        code: 'K001',
        text: 'Apakah Anda tinggal dekat dengan laut?',
        answers: answers
    },
    {
        code: 'K002',
        text: 'Apakah Anda tinggal di pusat kota?',
        answers: answers
    },
    {
        code: 'K003',
        text: 'Apakah Anda tinggal dekat pasar tradisional?',
        answers: answers
    },
    {
        code: 'K004',
        text: 'Apakah Anda tinggal di pedesaan?',
        answers: answers
    },
    {
        code: 'K005',
        text: 'Apakah Anda tinggal dekat perusahaan batu dan pasir?',
        answers: answers
    },
    {
        code: 'K006',
        text: 'Apakah Anda tinggal di perumahan?',
        answers: answers
    },
    {
        code: 'K007',
        text: 'Apakah Anda tinggal di dataran tinggi?',
        answers: answers
    },
    {
        code: 'K008',
        text: 'Apakah bangunan tempat Anda tinggal memiliki kurang dari 4 lantai?',
        answers: answers
    },
    {
        code: 'K009',
        text: 'Apakah bangunan tempat Anda tinggal memiliki lebih dari 4 lantai?',
        answers: answers
    },
    {
        code: 'K010',
        text: 'Apakah bangunan tempat Anda tinggal merupakan bangunan baru?',
        answers: answers
    },
    {
        code: 'K011',
        text: 'Apakah bangunan tempat Anda tinggal merupakan bangunan lama?',
        answers: answers
    },
    {
        code: 'K012',
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran kasar?',
        answers: answers
    },
    {
        code: 'K013',
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran setengah halus?',
        answers: answers
    },
    {
        code: 'K014',
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran halus?',
        answers: answers
    },
    {
        code: 'K015',
        text: 'Apakah dinding bangunan tempat Anda tinggal lembap?',
        answers: answers
    },
    {
        code: 'K016',
        text: 'Apakah harga cat yang Anda inginkan murah?',
        answers: answers
    },
    {
        code: 'K017',
        text: 'Apakah harga cat yang Anda inginkan menengah?',
        answers: answers
    },
    {
        code: 'K018',
        text: 'Apakah harga cat yang Anda inginkan mahal?',
        answers: answers
    }
]

window.questions = questions
window.answers = answers