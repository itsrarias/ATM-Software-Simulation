
//Those variables are hard coded values--------------------------------------
var account_number = ["2341563478905678","1234567890123456","1234567890654321"];
var atm_pin = ["2456","1234","2468"];
var account_holder_name = ["Simon","Andrew","Ricky"];
var account_balance = [1000.00,3000.00,2000.00];
var transaction_history = [];
//---------------------------------------------------------------------------


//----------------------------Not to change----------------------------------
var current_attempts_count = 0;

function redirect_withdraw(){
    window.location.href="withdraw.html";
}

function redirect_deposit(){
    window.location.href="deposit.html";
}

function redirect_transfer(){
    window.location.href="transfer.html";
}

function redirect_to_index(){

    window.location.href="index.html";

}



function transfer_amnt_feed_plus(amnt){
    var amount = document.getElementById("amnt").value;
    if(amount.length <=0){
        document.getElementById("amnt").value = amnt;
    }else{
        document.getElementById("amnt").value = parseFloat(amount) + parseFloat(amnt);
    }
}

function transfer_amnt_feed(amnt){
    document.getElementById("amnt").value = amnt;
}

function transfer_amnt_feed_minus(amnt){
    var amount = document.getElementById("amnt").value;
    if(amount.length <=0){
        document.getElementById("amnt").value = amnt;
    }else{
        if((parseFloat(amount) - parseFloat(amnt)) >= 0){
            document.getElementById("amnt").value = parseFloat(amount) - parseFloat(amnt);
        }
    }
}

//Method to withdraw amount from account-------------------------------------
function withdraw_amount(amnt,index){
    if("tr" in sessionStorage){
	    transaction_history = JSON. parse(sessionStorage.getItem("tr"));
	}
    if("acba" in sessionStorage){
	    account_balance = JSON. parse(sessionStorage.getItem("acba"));
	}
    account_balance[index] = parseFloat(account_balance[index]) - parseFloat(amnt);
    var dt = new Date().toLocaleString();
    var transaction = sessionStorage.getItem("acc_index")+";"+dt+";"+amnt+";0;"+account_balance[sessionStorage.getItem("acc_index")];
    transaction_history.push(transaction);
	sessionStorage.setItem("tr",JSON.stringify(transaction_history));
    sessionStorage.setItem("acba",JSON.stringify(account_balance));
    window.location.href="success-withd.html";
}

//Method to deposit amount in account----------------------------------------
function deposit_amount(amnt,index){
    if("tr" in sessionStorage){
	    transaction_history = JSON. parse(sessionStorage.getItem("tr"));
	}
    if("acba" in sessionStorage){
	    account_balance = JSON. parse(sessionStorage.getItem("acba"));
	}
    var dt = new Date().toLocaleString();
    account_balance[index] = parseFloat(account_balance[index]) + parseFloat(amnt);
    var transaction = sessionStorage.getItem("acc_index")+";"+dt+";0;"+amnt+";"+account_balance[sessionStorage.getItem("acc_index")];
    transaction_history.push(transaction);
	sessionStorage.setItem("tr",JSON.stringify(transaction_history));
    sessionStorage.setItem("acba",JSON.stringify(account_balance));
    window.location.href="success-dep.html";

}

//Method to transfer amount in account---------------------------------------
function transfer_amount(from_index, to_index, amnt){
    if("tr" in sessionStorage){
	    transaction_history = JSON. parse(sessionStorage.getItem("tr"));
	}
    if("acba" in sessionStorage){
	    account_balance = JSON. parse(sessionStorage.getItem("acba"));
	}
    account_balance[from_index] = parseFloat(account_balance[from_index]) - parseFloat(amnt);
    var dt = new Date().toLocaleString();
    var transaction = from_index+";"+dt+";"+amnt+";0;"+account_balance[from_index];
    transaction_history.push(transaction);
	sessionStorage.setItem("tr",JSON.stringify(transaction_history));
    var transaction = to_index+";"+dt+";0;"+amnt+";"+account_balance[to_index];
    transaction_history.push(transaction);
	sessionStorage.setItem("tr",JSON.stringify(transaction_history));
    account_balance[to_index] = parseFloat(account_balance[to_index]) + parseFloat(amnt);
    sessionStorage.setItem("fr",from_index);
    sessionStorage.setItem("to",to_index);
    sessionStorage.setItem("acba",JSON.stringify(account_balance));
    window.location.href="success-trans.html";
}


//Method to display account information--------------------------------------
function display_info(){
    window.location.href="information.html";
}

function load_info(){
    if("tr" in sessionStorage){
	    transaction_history = JSON. parse(sessionStorage.getItem("tr"));
	}
    if("acba" in sessionStorage){
	    account_balance = JSON. parse(sessionStorage.getItem("acba"));
	}

    document.getElementById("current_balance").innerHTML = "Current Balance : $"+account_balance[sessionStorage.getItem("acc_index")];

	console.log(transaction_history);
	if(transaction_history.length > 0){
        var html = "";
        for(var i = 0;i<transaction_history.length;i++){
            var data = transaction_history[i];
            var dtArr = data.split(';');
            var index = dtArr[0];
            if(sessionStorage.getItem("acc_index") == index){
                html += "<tr><td>"+dtArr[1]+"</td><td>"+dtArr[2]+"</td><td>"+dtArr[3]+"</td><td>"+dtArr[4]+"</td></tr>"
            }
        }
        document.getElementById("tbody").innerHTML = html;
    }else{
        var html = "<tr><td>"+new Date().toLocaleString()+"</td><td>0</td><td>0</td><td>"+account_balance[sessionStorage.getItem("acc_index")]+"</td></tr>"
        document.getElementById("tbody").innerHTML = html;
    }
}

//Method to enter account_number in input------------------------------------
function enter_acc_number(digit){
    var prev_val = document.getElementById("account_number").value;
    if(prev_val.length > 0){
        document.getElementById("account_number").value = document.getElementById("account_number").value + "" + digit;
    }
    else{
        document.getElementById("account_number").value = digit;
    }
}

//Method to enter pin_number in input------------------------------------
function enter_pin_number(digit){
    var prev_val = document.getElementById("pin_number").value;
    if(prev_val.length > 0){
        document.getElementById("pin_number").value = document.getElementById("pin_number").value + "" + digit;
    }
    else{
        document.getElementById("pin_number").value = digit;
    }
}

//Method to enter amnt_number in input------------------------------------
function enter_amnt_number(digit){
    var prev_val = document.getElementById("amnt").value;
    if(prev_val.length > 0){
        document.getElementById("amnt").value = document.getElementById("amnt").value + "" + digit;
    }
    else{
        document.getElementById("amnt").value = digit;
    }
}

//Method to remove digit from account_number---------------------------------
function remove_digit_acc_no(){
    var prev_val = document.getElementById("account_number").value;
    if(prev_val.length > 0){
        document.getElementById("account_number").value = prev_val.slice(0, -1);
    }
}

//Method to remove digit from pin_number---------------------------------
function remove_digit_pin_no(){
    var prev_val = document.getElementById("pin_number").value;
    if(prev_val.length > 0){
        document.getElementById("pin_number").value = prev_val.slice(0, -1);
    }
}

//Method to remove digit from amnt_number---------------------------------
function remove_digit_amnt(){
    var prev_val = document.getElementById("amnt").value;
    if(prev_val.length > 0){
        document.getElementById("amnt").value = prev_val.slice(0, -1);
    }
}


//Method to validate account_number------------------------------------------
function enter_btn_process_acc_no(){
    var prev_val = document.getElementById("account_number").value;
    var result = validate_account(prev_val);
    if(result == "Success"){
        window.location.href="pin.html";
    }else{
        alert(result);
    }
}

function back_to_home(){
    window.location.href="actions.html";
}

//Method to process transaction----------------------------------------------
function enter_btn_process_amnt(type){
    sessionStorage.setItem("type",type);
    sessionStorage.setItem("amnt",document.getElementById("amnt").value);
    if(type == "w"){
        window.location.href = "withd-alert.html";
    }
    if(type == "d"){
        window.location.href = "dep-alert.html";
    }
    if(type == "t"){
        window.location.href = "trans-alert.html";
    }
}

function process_trans(){
    var type = sessionStorage.getItem("type");
    var amount = sessionStorage.getItem("amnt");
    if(type == "w"){
        withdraw_amount(amount,sessionStorage.getItem("acc_index"));
    }

    if(type == "d"){
        deposit_amount(amount,sessionStorage.getItem("acc_index"));
    }

    if(type == "t"){
        transfer_amount(sessionStorage.getItem("acc_index"),sessionStorage.getItem("to_acc_index"),amount);
    }
}


//Method to validate pin_number------------------------------------------
function enter_btn_process_pin_no(){
    var prev_val = document.getElementById("pin_number").value;
    var result = validate_pin(prev_val,sessionStorage.getItem("acc_index"));
    if(result == "Success"){
        window.location.href="actions.html";
    }else{
        alert(result);
    }
}


//------------------------------ Validation methods -------------------------

//Method to validate the account number--------------------------------------
function validate_account(acc_no){
    if(acc_no.length < 16 || acc_no.length > 16){
        return "Invalid account number. Must be of 16 digit long";
    }
    else if(!account_number.includes(acc_no)){
        return "Account number is not registered with us. Try with another";
    }
    else{
        sessionStorage.setItem("acc_index",account_number.indexOf(acc_no));
        return "Success";
    }
}

//Method to validate atm pin------------------------------------------------
function validate_pin(atpin,index){
    console.log(atpin + " " + index);
    if(current_attempts_count < 5){
        if(atpin.length < 4 || atpin.length > 4){
            current_attempts_count++;
            return "ATM PIN must be 4 digit long";
        }
        else if(atm_pin[index] != atpin){
            current_attempts_count++;
            return "Incorrect PIN. You have "+(5-current_attempts_count)+" attempts left.";
        }
        else{
            current_attempts_count++;
            return "Success";
        }

    }else{
        return "Your account is locked for 24 hours due to multiple invalid attempts";
    }

}
