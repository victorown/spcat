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
        busy: true
    },
    mounted() {
        
    },
    methods: {
        submitFormData() {
            this.showAdditionalForm = true;
            this.showForm = false;
        },

        showButton(){
            if(!this.formData){
                this.busy = true
            }else{
                this.busy = false
            }
        }

    }
});