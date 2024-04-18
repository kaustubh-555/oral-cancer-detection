document.getElementById('chooseImageButton').addEventListener('click', function() {
    document.getElementById('imageInput').click();
  });
  
  document.getElementById('imageInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      var imgElement = document.createElement('img');
      imgElement.src = event.target.result;
      imgElement.style.maxWidth = '40%'; // Set the maximum width to 40%
      document.getElementById('imagePreview').innerHTML = '';
      document.getElementById('imagePreview').appendChild(imgElement);
    };
    
    reader.readAsDataURL(file);
  });
  function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            // Convert image to Base64, and strip out the header part
            const base64Image = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  
            // Prepare JSON payload
            const imageJSON = {
                image: base64Image,
                contentType: input.files[0].type
            };
  
            // Use fetch API to send the image to the server
            fetch('http://127.0.0.1:5000/getResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imageJSON)
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                let x=document.getElementById("result")
                x.innerHTML=data.result
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
  }
  
document.getElementById('submitBtn').addEventListener('click', uploadImage);  