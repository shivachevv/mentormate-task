var rl = require("readline");
var prompts = rl.createInterface(process.stdin, process.stdout);
prompts.question("Enter Your Name? ", function (username) {
    prompts.question("Enter Your Age ? ", function (userage) {
        prompts.question("Enter Your Email ID? ", function (emailid) {
            prompts.question("Enter Your Mobile No.? ", function (mobile) {
                var message = "";
                if (userage > 18) {
                    message = "\n\n Great! " + username + "\n\n You can signin." + "\n\n User Name : " + username + "\n\n Age       : " + userage + "\n\n Email ID  : " + emailid + "\n\n Mobile    : " + mobile;
                } else {
                    message = "Minimum required 18 years and you age is " + userage + " , You should wait at least " + (18 - userage) + " year(s) more.";
                }
                console.log(message);
                //process.exit();
            });
        });
    });
}); 