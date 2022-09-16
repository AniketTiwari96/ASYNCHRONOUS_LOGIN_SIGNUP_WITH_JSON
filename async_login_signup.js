const fs=require('fs');
const input=require('readline-sync');

console.log('What do you want to choice ');
console.log('\nPress 1 for sign up\nPress 2 for log in\nPress 3 for break\n');
const checkgmail=()=>{
    const email=input.question('Please enter your gmail id => ');
    if(email.includes('@') && email.includes('gmail.com')){
        console.log('Your gmail id is right ;');
        return email;
    }else {
        console.log('\nYour gmail is not right\nPlease enter your gmail id\n');
        return checkgmail();
    }
}
const passd=()=>{
    const array=['@','#','$','&','*','?','/','^',1,2,3,4,5,6,7,8,9,0];
    const password=input.question('Please enter your Password => '); 
    for( arr of array){
        if(password.length=='8' && password.includes(arr)){
            console.log('Your password is right ');
            return password;
        }
        else{
            console.log('\nYour password is not strong\nPlease enter your strong password\n');
            return passd();
        }
    }
}
const Sign_up=()=>{
    if(fs.existsSync('data.txt')){
        fs.readFile('data.txt','utf-8',(err,data)=>{
            console.log(data);
            const email=checkgmail();
            if(data.includes(email)){
                console.log('Your email id allready have\nGo and log in.... ');
            }else{
                const user_id=input.question('Please enter your user id => ');
                const Full_name=input.question('Please enter your full Name => ');
                const password=passd();
                fs.appendFile('data.txt',`[${email},${user_id},${Full_name},${password}]\n`,(err,data)=>{
                    console.log('your data is done ');
                });
            }
        })
    }else{
        fs.createWriteStream('data.txt');
        console.log('Your file is created ;');
    }
}
const Log_in=async ()=>{
    fs. readFile('data.txt','utf-8',(err,data)=>{
        const email=checkgmail();
        const password=passd();
        if(data.includes(email) && data.includes(password)){
            console.log('Your login Successfully ');
        }else{
            console.log('Your gmail id is not right\nPlease enter your right gmail id ');
            Log_in();
        }
    })
}
const choice=input.questionInt('Please enter your choice => ')
if(choice === 1){
    Sign_up();
}else if(choice === 2 ){
    Log_in();
}else if( choice === 3 ){
    process.exit();
}
