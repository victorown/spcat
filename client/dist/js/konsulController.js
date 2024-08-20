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
        inputStyle: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight invalid:focus:outline-red-400 valid:focus:outline-blue-500 mt-2",
    },
    mounted() {
        this.idKonsumen = localStorage.getItem("konsumen")
        if (this.idKonsumen) {
            this.showForm = true
        } else {
            this.showForm = false
        }
    },
    created() {
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
            console.log("id Kondisi: ", idKondisi.data.id);
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
            console.log('masukan data: ', this.Jawaban);
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

                console.log("data answer final: ", JSON.stringify(this.Jawaban));

            } catch (error) {
                console.error(error);
            }

            let data = this.Jawaban.map(x => {return {pilihan: x.pilihan, code: x.code}})
            this.mapingHasils();
            console.log("ini isi data: ", data);
            console.log("Maping 1st: ", this.hasils);
            axios.post(this.apiUrl + '/hitung', data, this.header)
                .then(response => {
                    this.hasils.final = response.data;
                    console.log('Response:', response.data);
                    console.log('Maping 2nd:', this.hasils);
                    // this.submitJawabans(this.Jawaban);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        async submitJawabans(model) {
            let data = {};
            data.pilihan = model.map(x => {return {pilihan: x.pilihan, KondisiId: x.kondisiId }});
            data.konsumenId = this.idKonsumen;
            axios.post(this.apiUrl + '/konsul', data, this.header);
        },

        mapingHasils(){
            this.hasils.pilihan = this.Jawaban.map(x => {return {pilihan: x.pilihan}});
            this.hasils.kondisi = this.questions.map(x => {return {question: x.text}});
        },

    }
});