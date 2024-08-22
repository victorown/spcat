new Vue({
    el: '#wrapper',
    data: {
        apiUrl: 'http://localhost:3000/api',
        riwayatList: [],
        konsumen: {},
        konsul: {},
        kondisis: [],
        hasils: [],
        selectedRiwayat: null,
        title: 'Admin - Riwayat',
    },
    mounted() {
        this.getDataFromApi();
    },
    created() {
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
            fetch(this.apiUrl + '/konsul')
                .then(response => response.json())
                .then(data => {
                    this.riwayatList = data;

                })
                .catch(error => console.error('Error fetching data:', error));
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const times = new Date(dateString);
            const timeOptions = new Intl.DateTimeFormat('id-ID', {hour: '2-digit', minute: '2-digit'} );
            const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options)
            const formattedTime = timeOptions.format(times);
            // console.log(`Formatted Date: ${formattedDate} ${formattedTime}`);
            return `${formattedTime} - ${formattedDate}`
        },
        riwayatDetail(riwayat) {
            // this.selectedRiwayat = riwayat.Konsumen;
            // console.log(riwayat.id);
            window.location.href = `/admin/riwayat/${riwayat.id}`;
            
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