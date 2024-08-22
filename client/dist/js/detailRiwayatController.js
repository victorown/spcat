new Vue({
    el: '#wrapper',
    data: {
        apiUrl: 'http://localhost:3000/api',
        header: { headers: { 'Content-Type': 'application/json', } },
        riwayatList: [],
        konsumen: {},
        konsul: {},
        kondisis: [],
        hasils: [],
        Jawaban: [],
        riwayatId: null,
        selectedRiwayat: null,
        questions: window.questions,
        riwayatList: {},
        title: 'Admin - Detail Riwayat',
    },
    mounted() {
        this.getDataFromApi();
    },
    created() {
        const path = window.location.pathname;
        const segments = path.split('/');
        this.riwayatId = segments[segments.length - 1];
        console.log('id riwayat: ', this.riwayatId);
        const token = localStorage.getItem('token');

        if (token) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            window.location.href = '/login';
        }
    },
    methods: {
        getDataFromApi() {
            console.log('id dalam method get: ', this.riwayatId);
            axios.get(`${this.apiUrl}/konsul/${this.riwayatId}`, this.header)
                .then(response => {
                    this.riwayatList = response.data;
                    this.konsumen = this.riwayatList.Konsumen
                    console.log('data konsumen: ', this.riwayatList);
                    let getKondisis = this.riwayatList.Kondisis;
                    this.Jawaban = getKondisis.map(x => x.Jawaban)
                    this.mapingHasils();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        mapingHasils() {
            let pilihanx = this.Jawaban.map(x => x.pilihan);
            let questionx = this.questions.map(x => x.text);
            this.hasils.selected = pilihanx.map((pilihans, index) => { return { pilihans, questions: questionx[index] } });
            console.log("hasil maping: ", this.hasils);
        },

        hitungs(data) {
            this.konsumen = data.Konsumen;
            this.konsul = data;
            this.kondisis = this.konsul.Kondisis;
            this.hasils = this.kondisis.map(x => {
                return {
                    pilihan: x.Jawaban.pilihan,
                    kondisiId: x.Jawaban.KondisiId
                }
            })
            console.log("Maping res hasils: ", this.hasils);
            // console.log("data hitung: ", data);
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }

    }
});