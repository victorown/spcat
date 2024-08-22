new Vue({
    el: '#wrapper',
    data: {
        apiUrl: 'http://localhost:3000/api',
        header: { headers: { 'Content-Type': 'application/json', } },
        showTable: true,
        buttonName: 'Hide Table',
        showResCard: false,
        riwayatList: [],
        konsumen: {},
        konsul: {},
        kondisis: [],
        hasils: [],
        Jawaban: [],
        riwayatId: null,
        selectedRiwayat: null,
        questions: window.questions,
        isBusy: true,
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

        hitungs() {
            this.kondisis = this.riwayatList.Kondisis;
            let code = this.kondisis.map(x => x.kode);
            let pilihanx = this.Jawaban.map(x => x.pilihan);
            let data = pilihanx.map((pilihan, index) => { return { pilihan, code: code[index] } });
            console.log("Maping counting value: ", data);
            axios.post(this.apiUrl + '/hitung', data, this.header)
                .then(response => {
                    this.hasils.final = response.data;
                    this.hasils.final.sort((a, b) => b.odd - a.odd);
                    console.log('Response:', this.hasils);
                    this.isBusy = false;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            // console.log("data hitung: ", data);
        },
        formatPercentage(num) {
            return new Intl.NumberFormat('default', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        },
        formatDecimals(num) {
            return Math.trunc(num * 1000) / 1000;
        },
        showAction() {
            this.showTable ? this.buttonName = 'Show Table' : this.buttonName = 'Hide Table';
            this.showTable = !this.showTable;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }

    }
});