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
        $projectOverlay.append($projectTitle);
        $projectOverlay.append($projectDescription);

        $projectThumbnail.append($projectOverlay);    

        
        $("#projects").append($projectThumbnail);
    }

});