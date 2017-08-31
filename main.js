
class Main {
    constructor() {
        this.state = {
            title: "Hello",
            name: "world!"
        }
    }

    render(){
        let h1 = document.createElement('h1');
        h1.innerHTML = this.state.title + " " + this.state.name;
        document.body.appendChild(h1);
    }

}

let app = new Main();

app.render();
