new Vue({
    el: '#app',
    data: {
        apiUrl: "http://localhost:3000/api",
        formData: {
            namaKonsumen: '',
            alamat: '',
            kontak: '',
            email: ''
        },
        header: { headers: { 'Content-Type': 'application/json', } },
        Jawaban: [],
        dataKondisi: {},
        selectedKondisi: [],
        questions: window.questions,
        showForm: false,
        busy: true,
        hasils: [],
        result: false,
        showRes: false,
        showGuide: true,
        imgUrl: '',
        showToTopButton: false,
        inputStyle: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight invalid:focus:outline-red-400 valid:focus:outline-blue-500 mt-2",
    },
    watch: {
        showRes(newVal) {
            console.log("showRes changed:", newVal);
            if (newVal) {
                this.$nextTick(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollFunction);
        this.idKonsumen = localStorage.getItem("konsumen");
        this.showForm = !!this.idKonsumen;
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.toggleVisibility);
    },
    methods: {
        submitFormData() {
            axios.post(this.apiUrl + '/konsumen', this.formData).then((res) => {
                if (res) {
                    this.idKonsumen = res.data.id
                    localStorage.setItem('konsumen', this.idKonsumen)
                }
            })
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
            // this.mapingHasils();
            axios.post(this.apiUrl + '/hitung', data, this.header)
                .then(response => {
                    this.hasils.final = response.data;
                    this.hasils.final.sort((a, b) => b.odd - a.odd);
                    console.log('Response:', response.data);
                    // this.submitJawabans(this.Jawaban);
                    this.mapingHasils();
                    this.setFirstRecommend(this.hasils.final);
                    this.showRes = true;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        async submitJawabans(model) {
            let data = {};
            data.pilihan = model.map(x => { return { pilihan: x.pilihan, KondisiId: x.kondisiId } });
            data.konsumenId = this.idKonsumen;
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
            console.log("first index of final arrays: ", this.firstRecommend);
            if (this.firstRecommend.cat.nama === "Colour Extreme") this.imgUrl = "../dist/img/colour-extreme.png";
            else if (this.firstRecommend.cat.nama === "Ultra Clean") this.imgUrl = "../dist/img/ultra-clean.png";
            else if (this.firstRecommend.cat.nama === "Flex") this.imgUrl = "../dist/img/flex.png";
            else if (this.firstRecommend.cat.nama === "Antifade") this.imgUrl = "../dist/img/antifade.png";
            else if (this.firstRecommend.cat.nama === "Tough Shield") this.imgUrl = "../dist/img/tough-shield.png";
            else if (this.firstRecommend.cat.nama === "Tough Shield Max") this.imgUrl = "../dist/img/tough-shield-max.png";
        },

    },
});