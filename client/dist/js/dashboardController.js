new Vue({
    el: '#wrapper',
    data: {
        isAuthenticated: false,
        apiUrl: "http://localhost:3000/api",
        title: 'Admin - Dashboard',
        cats: null,
        kondisis: null,
        pengetahuans: null,
        riwayats: null,
        dataKonsumen: [],
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            window.location.href = './view/login.html';
        }
    },
    mounted() {
        this.getCat();
        this.getKondisi();
        this.getPenge();
        this.getRiwayat();
    },
    methods: {
        getCat() {
            axios.get(`${this.apiUrl}/cat`, window.crtHeader()).then(res => {
                this.cats = res.data.length;
            });
        },
        getKondisi() {
            axios.get(`${this.apiUrl}/kondisi`, window.crtHeader()).then(res => {
                this.kondisis = res.data.length;
            });
        },
        getPenge() {
            axios.get(`${this.apiUrl}/pengetahuan`, window.crtHeader()).then(res => {
                this.pengetahuans = res.data.length;
            });
        },
        getRiwayat() {
            axios.get(`${this.apiUrl}/konsul`, window.crtHeader()).then(res => {
                let datax = res.data
                this.riwayats = datax.length;
                this.dataKonsumen = datax.map(x => { return { konsumen: x.Konsumen, tanggal: x.tanggal, id: x.id } });
                this.dataKonsumen.reverse()
            });
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const times = new Date(dateString);
            const timeOptions = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' });
            const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options)
            const formattedTime = timeOptions.format(times);
            return `${formattedTime} - ${formattedDate}`
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        },
        riwayatDetail(id) {
            window.location.href = `/admin/riwayat/${id}`;
        },

    },
});