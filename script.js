$(function() {
    function loadUser(id){
        $.ajax({
            url: "https://gorest.co.in/public/v2/users/" + id,
            type: "GET",
            success: function(data){
                console.log(data);
                var user = data; // Assign the response directly to the user variable
                var userList = document.getElementById('user-list'); // Get the ul element
                userList.innerHTML = ''; // Clear previous content
                console.log(user);
                
                var li = document.createElement('li');
                li.innerHTML = '<strong>ID:</strong> ' + user.id + '<br>' +
                               '<strong>Name:</strong> ' + user.name + '<br>' +
                               '<strong>Email:</strong> ' + user.email + '<br>' +
                               '<strong>Gender:</strong> ' + user.gender + '<br>' +
                               '<strong>Status:</strong> ' + user.status;
                userList.appendChild(li); // Append user info to the ul
            },
            error: function(xhr, status, error) {
                console.error('Error fetching user:', error);
            }
        });
    }

    $('#get-user-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        var ids = $('#get-id').val();
        console.log(ids);

        loadUser(ids); // Call the function to load the user when the button is clicked
    });

    function createUser(userData, accessToken) {
        $.ajax({
            url: "https://gorest.co.in/public/v2/users",
            type: "POST",
            contentType: "application/json", // Specify the content type
            data: JSON.stringify(userData),
            headers: {
                "Authorization": "Bearer " + accessToken // Include the access token in the headers
            }, // Convert user data to JSON string
            success: function(response) {
                console.log('User created:', response);
                // Optionally, you can perform actions after the user is created
            },
            error: function(xhr, status, error) {
                console.error('Error creating user:', error);
            }
        });
    }

    // Event listener for form submission
    $('#create-user-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get user data from form inputs
        var userData = {
            id: 123,
            name: $('#name').val(),
            email: $('#email').val(),
            gender: $('#gender').val(),
            status: $('#status').val()
        };
        console.log(userData);
        // Call createUser function with user data
        accessToken = "2f827a50671889ccb9bb12ca31fa4e051c707098410353d811404de1d780cc97";
        createUser(userData, accessToken);
    });

    function deleteUser(userId, accessToken) {
        // AJAX request to delete a user
        $.ajax({
            url: "https://gorest.co.in/public/v2/users/" + userId,
            type: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken // Include the access token in the headers
            }, 
            success: function(response) {
                console.log('User deleted:', response);
                // Optionally, you can perform actions after the user is deleted
            },
            error: function(xhr, status, error) {
                console.error('Error deleting user:', error);
            }
        });
    }

    // Event listener for form submission to delete a user
    $('#delete-user-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get user ID from form input
        var userId = $('#delete-id').val();
        
        // Call deleteUser function with user ID
        accessToken = "2f827a50671889ccb9bb12ca31fa4e051c707098410353d811404de1d780cc97";

        deleteUser(userId, accessToken);
    });

    // Function to update user details
    function updateUser(userId, status, accessToken) {
        // AJAX request to update user details
        $.ajax({
            url: "https://gorest.co.in/public/v2/users/" + userId,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ status: status }),
            headers: {
                "Authorization": "Bearer " + accessToken // Include the access token in the headers
            }, 
            success: function(response) {
                console.log('User updated:', response);
                // Optionally, you can perform actions after the user is updated
            },
            error: function(xhr, status, error) {
                console.error('Error updating user:', error);
            }
        });
    }

    // Event listener for form submission to update user details
    $('#put-user-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get user ID and updated data from form inputs
        var userId = $('#put-id').val();
        var status = $('#put-status').val();

        // Call updateUser function with user ID and updated data
        accessToken = "2f827a50671889ccb9bb12ca31fa4e051c707098410353d811404de1d780cc97";

        updateUser(userId, status, accessToken);
    });

});
