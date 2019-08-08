const users = [];

module.exports = class User {
    constructor(username, email, password, userImage) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userImage = userImage;
    }

    // Save ticket to database
    save() {
        products.push(this);
    }

    // Call the fetchAll method on the User class itself by making it static
    static fetchAll() {
        return this.products;
    }
    
}