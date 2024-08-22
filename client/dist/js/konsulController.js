new Vue({
    el: '#app',
    data: {
        apiUrl: "http://localhost:3000/api",
        formData: {},
        header: { headers: { 'Content-Type': 'application/json', } },
        Jawaban: [],
        dataKondisi: {},
        selectedKondisi: [],
        questions: window.questions,
        showForm: true,
        busy: true,
        hasils: [],
        result: false,
        showRes: false,
        showGuide: true,
        imgUrl: '',
        showToTopButton: false,
        idKonsumen: 0,
        inputStyle: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight invalid:focus:outline-red-400 valid:focus:outline-blue-500 mt-2",
    },
    mounted() {
        let data = localStorage.getItem("konsumen");
        if (data) {
            let parseData = JSON.parse(data);
            this.formData = parseData
            this.showForm = false;
        } else {
            this.showForm = true;
        }
    },
    methods: {
        setEdit() {
            this.showForm = true;
            this.busy = false;
        },

        submitFormData() {
            try {
                if (this.formData.id) {
                    // console.log("Data put: ", this.formData);
                    axios.put(this.apiUrl + `/konsumen/${this.formData.id}`, this.formData).then((res) => {
                        if (res) {
                            this.showForm = false
                            localStorage.setItem('konsumen', JSON.stringify(this.formData));
                        }
                    });
                } else {
                    // console.log("Data post: ", this.formData);
                    axios.post(this.apiUrl + '/konsumen', this.formData).then((res) => {
                        if (res) {
                            let data = res.data;
                            this.formData = data;
                            this.showForm = false;
                            localStorage.setItem('konsumen', JSON.stringify(data));
                        }
                    })
                }
            } catch (err) {
                console.error("Gagal menimpan data konsumen", err);
            }
            this.showForm = true;
        },

        showButton() {
            if (!this.formData) {
                this.busy = true
            } else {
                this.busy = false
            }
        },

        async getIdKondisi(kode) {
            const idKondisi = await axios.get(`${this.apiUrl}/kondisi/kode/${kode}`);
            return idKondisi.data.id
        },

        updateAnswer(questionCode, answersPilihan, qindex) {
            if (this.Jawaban[qindex]) {
                this.$set(this.Jawaban, qindex, {
                    code: questionCode,
                    pilihan: answersPilihan,
                });
            } else {
                this.$set(this.Jawaban, qindex, {
                    code: questionCode,
                    pilihan: answersPilihan,
                });
            }
        },

        async submitAnswers() {
            alert('yakin simpan data?');

            try {
                this.Jawaban = await Promise.all(this.Jawaban.map(async (jawaban) => {
                    const idKondisi = await this.getIdKondisi(jawaban.code);
                    return {
                        ...jawaban,
                        kondisiId: idKondisi
                    };
                }));

                if (Array.isArray(this.Jawaban)) {
                    this.Jawaban = this.Jawaban.filter(jawaban => jawaban !== undefined);
                }

            } catch (error) {
                console.error(error);
            }

            let data = this.Jawaban.map(x => { return { pilihan: x.pilihan, code: x.code } })
            console.log("data before counting: ", data);
            axios.post(this.apiUrl + '/hitung', data, this.header)
                .then(response => {
                    this.hasils.final = response.data;
                    this.hasils.final.sort((a, b) => b.odd - a.odd);
                    // console.log('Response:', response.data);
                    this.submitJawabans(this.Jawaban);
                    this.mapingHasils();
                    this.setFirstRecommend(this.hasils.final);
                    this.showRes = true;
                    // document.getElementById("app").scrollIntoView({behavior:'smooth'});
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        async submitJawabans(model) {
            let data = {};
            data.pilihan = model.map(x => { return { pilihan: x.pilihan, KondisiId: x.kondisiId } });
            data.konsumenId = this.formData.id;
            // console.log("data konsul: ", data);
            axios.post(this.apiUrl + '/konsul', data, this.header);
        },

        mapingHasils() {
            let pilihanx = this.Jawaban.map(x => x.pilihan);
            let questionx = this.questions.map(x => x.text);
            this.hasils.selected = pilihanx.map((pilihans, index) => { return { pilihans, questions: questionx[index] } });
        },

        formatPercentage(num) {
            return new Intl.NumberFormat('default', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        },

        setFirstRecommend(data) {
            this.firstRecommend = data[0];
            // console.log("first index of final arrays: ", this.firstRecommend);
            if (this.firstRecommend.cat.nama === "Colour Extreme") this.imgUrl = "../dist/img/colour-extreme.png";
            else if (this.firstRecommend.cat.nama === "Ultra Clean") this.imgUrl = "../dist/img/ultra-clean.png";
            else if (this.firstRecommend.cat.nama === "Flex") this.imgUrl = "../dist/img/flex.png";
            else if (this.firstRecommend.cat.nama === "Antifade") this.imgUrl = "../dist/img/antifade.png";
            else if (this.firstRecommend.cat.nama === "Tough Shield") this.imgUrl = "../dist/img/tough-shield.png";
            else if (this.firstRecommend.cat.nama === "Tough Shield Max") this.imgUrl = "../dist/img/tough-shield-max.png";
        },

        formatDecimals(num) {
            return Math.trunc(num * 1000) / 1000;
        },

        endKonsul() {
            localStorage.removeItem('konsumen');
            window.location.href = '../';
        },

        againKonsul() {
            location.reload();
        },

    },
});