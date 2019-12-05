var app = new Vue({
    el: "#signup-area",
    data: {
        url: "http://localhost:3000/signup",
        username: null,
        password: null
    },

    methods: {
        async submit() {
            let newUser = {
                'username': this.username,
                'password': this.password
            };
    
            try {
                var response = await axios.post(this.url, newUser);
    
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

});