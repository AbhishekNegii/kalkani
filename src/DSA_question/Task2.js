var n=window.prompt('User Input')
const xyz=(n)=>{
    let num1=0
    let num2=1
    let sum=0
    for(let i=0;i<=n;i++){
        if(num1>n){
            break;
            }
        console.log(num1)
        sum=num1+num2;
        num1=num2;
        num2=sum
    }
    }
    xyz(n)

