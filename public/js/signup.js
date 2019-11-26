var app = new Vue({
    el: "#signup-area",
    data: {
        url: "http://localhost:3000/signup",
        email: null,
        fullname: null,
        username: null,
        password: null
    },

    methods: {
        async submit() {
            let newUser = {
                'email': this.email,
                'fullname': this.fullname,
                'username': this.username,
                'password': this.password
            };
    
            try {
                alert(`${newUser.email}\n${newUser.fullname}\n${newUser.username}\n${newUser.password}`);
    
                var response = await axios.post(this.url, newUser);
    
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

});