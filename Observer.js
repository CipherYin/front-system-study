
/**
 * 任何一个数据都有可能被改变或者被访问
 * 
 */

class Target {
    constructor (data){
        this.data = data;
        this.init();
    }
    
    init(){
        this.validateData(this.data)
    }

    validateData (data){
        const {username,password,age,gender} = data;
        username.length <6 && (data.username = '');
        password.length <6 && (data.password = '');
        typeof age != 'number' && (data.age = 0);
        !['male','female'].includes(gender) && (data.gender = 'male')
    }

    proxyData() {
        const _this = this;
        for(let key in this.data){
            Object.defineProperty(this,key,{
                get(){
                    return _this.data[key];
                },
                set (newValue){
                    _this.data[key] = newValue;
                }
            })
        }
    }
}


