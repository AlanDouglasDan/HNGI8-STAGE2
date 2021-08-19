$('#contactForm').on('submit', (e)=> {
    e.preventDefault();
    let email = $('#contact-email').val().trim();
    let subject = $('#contact-subject').val().trim();
    let message = $('#contact-message').val().trim();
    let name = $('#contact-name').val().trim();

    let data = {
        name: name,
        email: email,
        subject: subject,
        message: message   
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/email');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            $('#contact-email').val("");
            $('#contact-name').val("");
            $('#contact-subject').val("");
            $('#contact-message').val("");
        }
        else{
            alert('something went wrong');
        }
    }
    xhr.send(JSON.stringify(data));
});