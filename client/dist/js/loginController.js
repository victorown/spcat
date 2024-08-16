new Vue({
    el: '#login',
    data: {
        pageTitle: 'Login | SP Jotun Cat',
        userName: '',
        password: '',
        title: "Login | SP Jotun",
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/admin/dashboard';
        } else {
            // window.location.href = '/konsul'
        }
    },
    methods: {
        login() {
            const apiUrl = 'http://localhost:3000/api/login';

            const formData = {
                userName: this.userName,
                password: this.password
            };

            axios.post(apiUrl, formData)
                .then(response => {
                    console.log('login successful:', response);

                    const token = response.data.token;
                    axios.defaults.headers.common['authorization'] = 'bearer ' + token;

                    localStorage.setItem('token', token);

                    window.location.href = '/admin/dashboard';
                })
                .catch(error => {
                    console.error('Login failed:', error);
                });
        }
    },
});