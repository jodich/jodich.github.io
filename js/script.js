$( document ).ready(function() {

    $('.nav-links a').hover(
        (event) => $(event.currentTarget).toggleClass('nav-link-active')
    )
    var delay = 0;
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        // thumbnail
        let $projectThumbnail = $("<div></div>").addClass("col s12 m6 l4 project-box");
        let $projectImg = $("<img>").attr('src', project.thumbnail).addClass("project-thumbnail");
        $projectThumbnail.append($projectImg);    

        let $projectOverlay = $("<div></div>").addClass("project-overlay");
        let $projectTitle = $("<div></div>").addClass("title").text(project.title);
        let $projectDescription = $("<p></p>").addClass("description").text(project.description);
        let $projectSrc = $("<a></a>").attr({
            "href" : project.src,
            "target": `${project.web ? "_blank" : ""}`
        }).addClass("link").text('View More')
        $projectDescription.append($projectSrc);
        $projectOverlay.append($projectTitle);
        $projectOverlay.append($projectDescription);
        $projectThumbnail.append($projectOverlay);

        $projectThumbnail.attr({'data-aos': 'flip-up', 'data-aos-delay': delay, 'data-aos-duration': 1000});
        delay += 100;
        if (delay == 300) {
            delay = 0;
        }
        $("#projects").append($projectThumbnail);
    }

    $('.btn-flat').hover(
        (event) => $(event.currentTarget).toggleClass('active')
    )

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: 400
      });
            

});