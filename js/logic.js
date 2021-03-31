$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/tutorial/1.0/employees',
        type: 'get',
        contentType: 'application/json',
        accept: "*/*",
        success: function(data, textStatus, jQxhr) {
            for(i = 0; i < data.length; i++) {
                if(i % 2 == 0)
                    $("#corpo").append("<div class='elemento even' id='elemento"+i+"'>");
                else
                    $("#corpo").append("<div class='elemento' id='elemento"+i+"'>");
                $("#elemento"+i).append("<div>"+data[i].firstName+" "+data[i].lastName+"</div><div>"+data[i].email+"</div><div>"+data[i].email+"</div><div>"+data[i].phone+"</div><div><input type='checkbox' class='select' id='"+data[i].employeeId+"' /></div>");
                $("#corpo").after("</div>");
            }
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });

    $('#addNewEmployee').click(function() {
        var id = $('#inpId').val();
        var firstName = $('#inpFirstName').val();
        var lastName = $('#inpLastName').val();
        var email = $('#inpEmail').val();
        var phone = $('#inpPhone').val();
        var datiDaInviare = {
            "employeeId": id,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone
        };

        $.ajax({
            url: 'http://localhost:8080/api/tutorial/1.0/employees',
            type: 'post',
            contentType: 'application/json',
            accept: "*/*",
            data: JSON.stringify(datiDaInviare),
            success: function(data, textStatus, jQxhr) {
                location.reload();
            },
            error: function(jqXhr, textStatus, errorThrown){
                console.log(errorThrown);
            }
        }); 
    });

    $('#delEmp').click(function(){
        $(".select:checked").each(function(){
            var id = $(this).attr('id');
    
            $.ajax({
                url: 'http://localhost:8080/api/tutorial/1.0/employees/'+id,
                type: 'delete',
                contentType: 'application/json',
                accept: "*/*",
                success: function(data, textStatus, jQxhr) {
                    location.reload();
                },
                error: function(jqXhr, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
        });
    });
});