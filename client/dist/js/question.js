
const answers = [
    { value: 0, text: 'Sangat tidak yakin' },
    { value: 0.2, text: 'Tidak yakin' },
    { value: 0.4, text: 'Sedikit yakin' },
    { value: 0.6, text: 'Cukup yakin' },
    { value: 0.8, text: 'Yakin' },
    { value: 1, text: 'Sangat yakin' }
];

const questions = [
    {
        code: 'K01',
        text: 'Apakah Anda tinggal dekat dengan laut?',
        answers: answers
    },
    { 
        code: 'K02', 
        text: 'Apakah Anda tinggal di pusat kota?',
        answers: answers
    },
    { 
        code: 'K03', 
        text: 'Apakah Anda tinggal dekat pasar tradisional?',
        answers: answers
    },
    { 
        code: 'K04', 
        text: 'Apakah Anda tinggal di pedesaan?',
        answers: answers
    },
    { 
        code: 'K05', 
        text: 'Apakah Anda tinggal dekat perusahaan batu dan pasir?',
        answers: answers
    },
    { 
        code: 'K06', 
        text: 'Apakah Anda tinggal di perumahan?',
        answers: answers
    },
    { 
        code: 'K07', 
        text: 'Apakah Anda tinggal di dataran tinggi?',
        answers: answers
    },
    { 
        code: 'K08', 
        text: 'Apakah bangunan tempat Anda tinggal memiliki kurang dari 4 lantai?',
        answers: answers
    },
    { 
        code: 'K09', 
        text: 'Apakah bangunan tempat Anda tinggal memiliki lebih dari 4 lantai?',
        answers: answers
    },
    { 
        code: 'K10', 
        text: 'Apakah bangunan tempat Anda tinggal merupakan bangunan baru?',
        answers: answers
    },
    { 
        code: 'K11', 
        text: 'Apakah bangunan tempat Anda tinggal merupakan bangunan lama?',
        answers: answers
    },
    { 
        code: 'K12', 
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran kasar?',
        answers: answers
    },
    { 
        code: 'K13', 
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran setengah halus?',
        answers: answers
    },
    { 
        code: 'K14', 
        text: 'Apakah dinding bangunan tempat Anda tinggal memiliki plesteran halus?',
        answers: answers
    },
    { 
        code: 'K15', 
        text: 'Apakah dinding bangunan tempat Anda tinggal lembap?',
        answers: answers
    },
    { 
        code: 'K16', 
        text: 'Apakah harga properti tempat Anda tinggal murah?',
        answers: answers
    },
    { 
        code: 'K17', 
        text: 'Apakah harga properti tempat Anda tinggal menengah?',
        answers: answers
    },
    { 
        code: 'K18', 
        text: 'Apakah harga properti tempat Anda tinggal mahal?',
        answers: answers
    }
]

window.questions = questions
window.answers = answers