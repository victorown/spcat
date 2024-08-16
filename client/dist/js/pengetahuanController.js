new Vue({
    el: '#wrapper',
    data: {
        pengetahuanList: [],
        kondisiList: [],
        catList: [],
        apiUrl: 'http://localhost:3000/api/cat',
        apiKondisi: 'http://localhost:3000/api/kondisi',
        apiPenge: 'http://localhost:3000/api/pengetahuan',
        id: 0,
        KondisiId: 0,
        catId: 0,
        cf: 0,
        pageTitle: 'Admin - Pengetahuan',
        modalTitle: 'Add Data Pengetahuan',
        token: localStorage.getItem('token')
    },
    mounted() {
        this.getDataFromApi();
        this.getDataKondisi();
        this.getDataCat();
    },
    computed: {
        getNamaCatById: function (catId) {
            const dataCat = this.catList.find(item => item.id === catId);
            return dataCat ? dataCat.nama : 'Cat tidak ditemukan';
        },
    },
    created() {
        if (this.token) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            window.location.href = '/login';
        }
    },

    methods: {

        getDataFromApi() {
            axios.get(this.apiPenge, window.crtHeader())
                .then(res => {
                    this.pengetahuanList = res.data;
                })
                .catch(err => console.error(err));
        },

        getDataKondisi() {
            axios.get(this.apiKondisi, window.crtHeader())
                .then(res => {
                    this.kondisiList = res.data;
                })
                .catch(err => console.error(err));
        },

        getDataCat() {
            axios.get(this.apiUrl, window.crtHeader())
                .then(res => {
                    this.catList = res.data;
                })
                .catch(err => console.error(err));
        },

        getNamaCatById(catId) {
            const dataCat = this.catList.find(item => item.id === catId);
            return dataCat ? dataCat.nama : 'Cat tidak ditemukan';
        },

        getNamaKondisiById(KondisiId) {
            const dataKondisi = this.kondisiList.find(item => item.id === KondisiId);
            return dataKondisi ? dataKondisi.nama : 'Kondisi tidak ditemukan';
        },

        addPenge() {
            const data = {
                id: this.id,
                catId: this.catId,
                KondisiId: this.KondisiId,
                cf: this.cf
            }

            if (!data.id) {
                axios.post(this.apiPenge, data, window.crtHeader())
                    .then(res => {
                        $("#input").modal('hide')
                        this.pengetahuanList.push(res.data)
                        this.id = 0
                        this.catId = 0
                        this.KondisiId = 0
                        this.cf = 0
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                axios.put(this.apiPenge + '/' + data.id, data, window.crtHeader())
                    .then(res => {
                        $("#input").modal('hide')
                        var res = this.pengetahuanList.find(x => x.Id == data.id);
                        if (res) {
                            res.catId = data.catId
                            res.KondisiId = data.KondisiId
                            res.cf = data.cf
                        }
                        this.id = 0
                        this.catId = 0
                        this.KondisiId = 0
                        this.cf = 0
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        },
        editPenge(item) {
            this.modalTitle = 'Edit Data Pengetahuan'
            this.id = item.Id
            this.catId = item.catId
            this.KondisiId = item.KondisiId
            this.cf = item.cf
        },
        delPenge(id) {
            axios.delete(this.apiPenge + '/' + id, window.crtHeader()).then(() => {
                this.pengetahuanList = this.pengetahuanList.filter(penge => penge.Id !== id);
            })
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem("role");
            window.location.href = '/login';
        }

    },
});