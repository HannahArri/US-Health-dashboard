var rowCountContact = 0; //variable to monitor number of contacts (always increment)
var rowCountDegree = 0; //variable to monitor number of degrees (always increment)
var rowCountUrl = 0; //variable to monitor number of urls

//add new html tags for new contact. Called on click of addcontact button
function addMoreContacts(frm){
    rowCountContact++; //increase count of row count for contacts
    //var to hold the html to be added
var divContent = '<div id="contact'+rowCountContact+'">\
    <fieldset>\
        <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
            <div style="float: left; width: 165px;">\
                Prefix\
            </div>\
            <div style="float: left;">\
                    <input class="field_value" type="text" name="prefix'+ rowCountContact+'" id="prefix'+ rowCountContact+'" value="" style="width: 500px;"/>\
            </div>\
        </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    First Name*\
                </div>\
                <div style="float: left;">\
                        <input class="field_value" type="text" name="first_name' +rowCountContact+'" id="first_name' +rowCountContact+'" value="" style="width: 500px;" required/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Last Name*\
                </div>\
                <div style="float: left;">\
                    <input class="field_value" type="text" name="last_name'+ rowCountContact+'" id="last_name'+ rowCountContact+'" value="" style="width: 500px;" required/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Suffix\
                </div>\
                <div style="float: left;">\
                    <input class="field_value" type="text" name="suffix'+rowCountContact+'" id="suffix'+rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Title\
                </div>\
                <div style="float: left;">\
                        <input class="field_value" type="text" name="title' + rowCountContact+'" id="title' + rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Department\
                </div>\
                <div style="float: left;">\
                    <input class="field_value" type="text" name="dept' +rowCountContact+'" id="dept'+rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Office\
                </div>\
                <div style="float: left;">\
                        <input class="field_value" type="text" name="office' + rowCountContact+'" id="office'+ rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Email\
                </div>\
                <div style="float: left;">\
                    <input class="field_value" type="text" name="email' +rowCountContact+'" id="email' +rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Phone\
                </div>\
                <div style="float: left;">\
                        <input class="field_value" type="text" name="phone' +rowCountContact+'" id="phone' + rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <fieldset>\
            <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
                <div style="float: left; width: 165px;">\
                    Department Url\
                </div>\
                <div style="float: left;">\
                    <input class="field_value" type="text" name="dept_url' +rowCountContact+'" id="dept_url' +rowCountContact+'" value="" style="width: 500px;"/>\
                </div>\
            </div><!--criteria end-->\
    </fieldset>\
    <a href="#" onclick="removecontact('+rowCountContact+');">Remove this Contact</a><br>\
</div>'
    jQuery('#addedRows').append(divContent); //append html to end of div
}

//add new html tags for new degrees
function addMoreDegrees(frm){
    rowCountDegree++;
divContent = '<div id="degree'+rowCountDegree+'">\
<fieldset>\
    <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
        <div style="float: left; width: 165px;">\
            Degree Title\
        </div>\
        <div style="float: left;">\
                <input class="field_value" type="text" name="desc' + rowCountDegree+'" id="desc'+rowCountDegree+'" value="" style="width: 500px;" required/>\
        </div>\
    </div><!--criteria end-->\
</fieldset>\
<fieldset>\
    <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
        <div style="float: left; width: 165px;">\
            Degree Title*\
        </div>\
        <div style="float: left;">\
            <select class="field_value" style="width: 500px;" name="degree_level'+ rowCountDegree+'">\
                <option value="Undergraduate">Undergraduate</option>\
                <option value="Graduate">Graduate</option>\
                <option value="Doctoral">Doctoral</option>\
            </select> \
        </div>\
    </div><!--criteria end-->\
</fieldset>\
<fieldset>\
        <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
            <div style="float: left; width: 165px;">\
                Discipline*\
            </div>\
            <div style="float: left;">\
                <select class="field_value" style="width: 500px;" name="discipline' + rowCountDegree+'">\
                    <option value="Industrial Engineering">Industrial Engineering</option>\
                    <option value="Systems Engineering">Systems Engineering</option>\
                    <option value="Industrial\Systems Engineering">Industrial\Systems Engineering</option>\
                    <option value="Other">Other</option>\
                </select> \
            </div>\
        </div><!--criteria end-->\
</fieldset>\
<fieldset>\
        <div style="text-align:center!important; display:block; margin-bottom: 30px; padding-bottom: 20px"> <!--Start of new search criteria-->\
            <div style="float: left; width: 165px;">\
                Degree Url\
            </div>\
            <div style="float: left;">\
                <input class="field_value" type="text" name="degree_url'+ ~ rowCountDegree+'" id="degree_url' +rowCountDegree+'" style="width: 500px;" value=""/>\
            </div>\
        </div><!--criteria end-->\
</fieldset>\
<a href="#" onclick="removedegree(' +rowCountDegree+');">Remove this Degree</a>\
<br>\
</div> ';
    jQuery('#degreeContent').append(divContent);
}

function addMoreUrl(frm){
    rowCountUrl++;
    var divContent='<div id="url'+rowCountUrl+'"> <label>Url Label:</label><input type="text" name="urllabel'+rowCountUrl+'" placeholder="Label"><label>Url:</label><input type="text" name="url'+rowCountUrl+'" placeholder="URL"><a href="#" onclick="removeurl('+rowCountUrl+');">Remove</a> <br><br></div>';
    jQuery('#urlContent').append(divContent);
}

function removeurl(removenum){
       
        jQuery('#url'+removenum).remove();
}

function removedegree(removenum){
    //if (rowCountTotalDegrees == 1) {
        //alert('You must have at least one degree');
        //return false;
    //} else {
        jQuery('#degree'+removenum).remove();
    //}
}

function removecontact(removenum) {
    //if (removenum<1) {
        //alert('You must specify at least one contact');
        //return false;
    //} else {
       
        jQuery('#contact'+removenum).remove();
    //}
}

function increaseCount(tag) {
    if (tag == 'url') {
        rowCountUrl++;
    } else if(tag == 'degree') {
        rowCountDegree++;
    } else if(tag == 'contact') {
        rowCountContact++;
    }
}

function setselectval(id, val) {
    document.getElementById(id).value = val;
}

function display_changelog(changes) {
    display_win = window.open('', 'NewWin', 'toolbar=no, status=no, width=500, height=500');
    message ="<table><tr><th>Time</th><th>User</th><th>Action</th><th>Status</th></tr>";
    for (i=0; i<changes.length(); i++) {
        message += '<tr><td>'+changes[i].timestamp+'</td><td>'+changes[i].user+'</td><td>'+changes[i].action+'</td><td>'+changes[i].status+'</td></tr>';
    }
    message += '</table>';
    display_win.document.write(message);
}

function otherstate(){
   
    val = document.getElementById('statesel').value;
    if (val == "Other"){
        // alert('you have chosen to enter a state manually');
        document.getElementById('statetxt').style.display = 'block';
        document.getElementById('statesel').style.display = 'none';
    }
    
}

function othercountry(){
   
    val = document.getElementById('countrysel').value;
    if (val == "Other"){
        // alert('you have chosen to enter a state manually');
        document.getElementById('countrytxt').style.display = 'block';
        document.getElementById('countrysel').style.display = 'none';
    }
    
}

function generate_password(){
    var data = {
        'username': document.getElementById('uname').value,
        'useremail':document.getElementById('uemail').value
    };
    $.ajax(
        {
            type:"POST", 
            url:"/admin/create",
            // dataType: 'json',
            data:data,
            success: function(response){
                console.log(response)
                // alert('account created for '+response.username +' with password: '+response.password);
            },
            error: function(){
                alert('An error occured');
            }
        });
}
function validate_password(){
    var pwrd1 = document.getElementById('password1').value;
    var pwrd2 = document.getElementById('password2').value;
    if(pwrd1 != pwrd2){
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }else{
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
    }
}
function confirm(){
    var html = "Thank You for your Submission! Your information has been recieved by our admin and will be reviewed. You will recieve a confirmation email once it has been approved.";
        alert(html);
}
function reject(){
    var reason = prompt("Please enter your reason for rejecting this enry");
    if (reason != null){
        document.getElementById('reason').value = reason;
        document.getElementById('admin_form').submit();
    }else{
        event.preventDefault();
        location.reload();
    }
}

function approved(){
    var reason = prompt("Enter comment");
    if (reason != null){
        document.getElementById('reason').value = reason;
        document.getElementById('admin_form').submit();
    }else{
        event.preventDefault();
        location.reload();
    }
}

function submitedit(){
    var form= document.getElementById("editform");
    document.getElementById("editsubmit").addEventListener("click", function(){
        form.submit();
    });
}