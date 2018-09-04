$( document ).ready(function() {

    $('.nav-links a').hover(
        (event) => $(event.currentTarget).toggleClass('nav-link-active')
    )

    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        // thumbnail
        let $projectThumbnail = $("<div></div>").addClass("col s12 m4 project-box");
        let $projectImg = $("<img>").attr('src', project.thumbnail).addClass("project-thumbnail");
        $projectThumbnail.append($projectImg);    

        let $projectOverlay = $("<div></div>").addClass("project-overlay");
        let $projectTitle = $("<div></div>").addClass("title").text(project.title);
        let $projectDescription = $("<p></p>").addClass("description").text(project.description);
        let $projectSrc = $("<a></a>").attr({
            "href" : project.src,
            "target": `${project.web ? "_blank" : ""}`
        }).addClass("link draw meet").text('View More')
        $projectDescription.append($projectSrc);

        $projectOverlay.append($projectTitle);
        $projectOverlay.append($projectDescription);

        $projectThumbnail.append($projectOverlay);    

        
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