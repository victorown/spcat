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
        jawabans: [],
        questions: window.questions,
        showForm: false,
        busy: true,
    },
    mounted() {
        console.log(this.formData);
        if(this.formData !== null){
            this.showForm = true
        }
    },
    methods: {
        submitFormData() {
            axios.post(this.apiUrl + '/konsumen', this.formData).then((res) => {
                if (res) {
                    this.formData = res
                    // console.log(res);
                    this.showForm = true;
                }
            })
        },

        showButton() {
            if (!this.formData) {
                this.busy = true
            } else {
                this.busy = false
            }
        },

        submitAnswers() {
            alert('yakin simpan data?');
            console.log(this.jawabans);
            // axios.post(this.apiUrl + '/hitung', this.jawabans)
        }

    }
});