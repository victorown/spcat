new Vue({
    el: "#wrapper",
    data: {
        apiUrl: "http://localhost:3000/api/cat",
        jenisCatList: [],
        kode: "",
        nama: "",
        some: 'ini test',
        id: 0,
        pageTitle: "Admin - Cat",
        modalTitle: "Input Data Cat",
        token: localStorage.getItem("token"),
    },
    mounted() {
        this.getDataFromApi();
        console.log(this.kode.toUpperCase());
    },
    created() {
        if (this.token) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            window.location.href = "/login";
        }
    },
    methods: {
        test(){
            this.some = this.some.split('').reverse().join('')
        },
        getDataFromApi() {
            axios
                .get(this.apiUrl, window.crtHeader())
                .then((res) => {
                    this.jenisCatList = res.data;
                })
                .catch((error) => console.error("Error get data:", error));
        },
        addCat() {
            const data = {
                id: this.id,
                kode: this.kode.toUpperCase(),
                nama: this.nama,
            };
            if (!data.id) {
                axios
                    .post(this.apiUrl, data, window.crtHeader())
                    .then((res) => {
                        $("#input").modal("hide");
                        this.jenisCatList.push(res.data);
                        this.id = 0;
                        this.kode = "";
                        this.nama = "";
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                axios
                    .put(this.apiUrl + "/" + data.id, data, window.crtHeader())
                    .then((res) => {
                        $("#input").modal("hide");
                        var res = this.jenisCatList.find((x) => x.id == data.id);
                        if (res) {
                            res.kode = data.kode;
                            res.nama = data.nama;
                        }
                        this.id = 0;
                        this.kode = "";
                        this.nama = "";
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        editCat(item) {
            this.modalTitle = "Update Data Cat";
            this.id = item.id;
            this.kode = item.kode;
            this.nama = item.nama;
        },

        delCat(id) {
            axios
                .delete(`http://localhost:3000/api/cat/${id}`, window.crtHeader())
                .then(() => {
                    this.jenisCatList = this.jenisCatList.filter(
                        (cat) => cat.id !== id
                    );
                });
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
        },
    },
});