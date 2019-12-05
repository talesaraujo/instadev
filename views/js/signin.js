var app = new Vue({
    el: "#login-area",
    data: {
        url: "http://localhost:3000/signin",
        username: null,
        password: null
    },

    methods: {
        async submit() {
            let user = {
                'username': this.username,
                'password': this.password
            };
    
            try {    
                var response = await axios.post(this.url, user);
    
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});