new Vue({
    el: '#app',
    data: {
        formData: {
            nama: '',
            alamat: '',
            kontak: '',
            email: ''
        },
        showAdditionalForm: false,
        showForm: true,
    },
    methods: {
        submitFormData() {
            this.showAdditionalForm = true;
            this.showForm = false;
        }
    }
});