// home page ajax response
const crypto = require('crypto');

$('#btn_submit').click(
    ()=>{
        console.log("click");
        if($('#url').val() == ''){
            console.log("Enter Nothing");
        }
        else {
            var url = $('#url').val();
            console.log("Submit the url", url);
            $.post('/input', {url}, (response)=>{
                // success then execute function
                $('#result').text(response)
            })
        }
    }
);