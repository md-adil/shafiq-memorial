(function() {
    var container = $('#data-rows').empty();
    var authorizationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTUxMWYxZGJiOWFlMzQ5YTE3ZjE5ZTIiLCJpYXQiOjE1ODIzNzQ2ODU3MjF9.NnMqOSf-uLerrDqCsKHmSYoI1sv7dNpbZ3tHYzW98jo";

    function fetchUsers() {
        var params = $.param({
            filters: [JSON.stringify({ field: "data.type", condition: "equal", value: "alumni" })],
            sortBy: "data.sort",
            sortOrder: 1
        });
        return $.ajax({
            type: "GET",
            url: "https://app.bigradar.io/api/users?" + params,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", authorizationToken);
            }
        })
    }

    function createElement(user) {
        return `<div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single_courses">
                <div class="thumb">
                    <a href="${user.data.profile}" target="adil">
                        <img src="${user.avatar}" style="height: 250px;object-fit:cover;" alt="" />
                    </a>
                </div>
                <div class="courses_info">
                    <strong>${user.name}</strong>
                    <div>
                        <a href="#">${user.data.position}</a
                        >&nbsp;@${user.data.company}</div>
                    <div
                        class="star_prise d-flex justify-content-between"
                    >
                        <div class="star">Year</div>
                        <div class="prise">${user.data.year}</div>
                    </div>
                </div>
            </div>
        </div>`
    }

    fetchUsers().then(function(users) {
        $.each(users.docs, function() {
            container.append(
                createElement(this)
            )
        })
    });
})();