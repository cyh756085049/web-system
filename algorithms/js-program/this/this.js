const name = 'jack';

var obj = {
    name: 'join',
    sayHello: function() {
        setTimeout(() => {
            console.log('this', this);
            console.log(`hello, ${this.name}`);
        }, 1000);
    }
}

obj.sayHello(); // hello, join