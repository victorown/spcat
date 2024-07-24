new Vue({
    el: '#wrapper',
    data: {
        kondisiRumahList: [],
        apiUrl: 'http://localhost:3000/api/kondisi',
        id: 0,
        kode: '',
        nama: '',
        btn: 'click me',
        token: '',
        pageTitle: 'Admin - Kondisi',
        modalTitle: 'Input Data Kondisi',
    },
    mounted() {
        this.getDataFromApi();
    },
    created() {
        var token = localStorage.getItem('token');

        if (token) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            window.location.href = '/login';
        }
    },
    methods: {
        getDataFromApi() {
            axios.get(this.apiUrl, window.crtHeader())
                .then(res => {
                    this.kondisiRumahList = res.data
                })
                .catch(err => console.error(err))
        },
        addKon() {
            const data = {
                id: this.id,
                kode: this.kode.toUpperCase(),
                nama: this.nama
            }
            if (!data.id) {
                axios.post(this.apiUrl, data, window.crtHeader())
                    .then(res => {
                        $('#input').modal('hide')
                        this.kondisiRumahList.push(res.data);
                        this.id = 0;
                        this.kode = '';
                        this.nama = '';
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                axios.put(this.apiUrl + '/' + data.id, data, window.crtHeader())
                    .then(res => {
                        $('#input').modal('hide')
                        var res = this.kondisiRumahList.find(x => x.id == data.id)
                        if (res) {
                            res.kode = data.kode;
                            res.nama = data.nama;
                        }
                        this.id = 0;
                        this.kode = '';
                        this.nama = '';
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        },

        editKon(item) {
            this.modalTitle = 'Update Data Kondisi'
            this.id = item.id;
            this.kode = item.kode;
            this.nama = item.nama;
        },
        delKon(id) {
            axios.delete(`http://localhost:3000/api/kondisi/${id}`, window.crtHeader())
                .then(() => {
                    this.kondisiRumahList = this.kondisiRumahList.filter(kondisi => kondisi.id !== id);
                })
        },

        logout() {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

    }
});