///////////////////
// DEBUG HELPERS //
///////////////////

let bpx = 0;
function bp() {
    bpx++;
}


/////////////////
// APPLICATION //
/////////////////

// VARIABLES
let projects;


// QUERY SELECTOR
let page = document.querySelector("#page");

//FUNCTIONS
function ListBuilder(projects) {
    for(let index in projects){
        let project = projects[index];

        let projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        let projectElement = document.createElement("a");
        projectElement.href = project.href;
        projectElement.target = "_blank";
        projectElement.classList.add("board");


        let elementTitle = document.createElement("h1");
        elementTitle.textContent =  `#${index} ` + project.title;

        let elementContent = document.createElement("h3");
        elementContent.textContent = project.caption;
        projectElement.append(elementTitle, elementContent);
        page.append(projectElement);    
    }
    console.log(page);
}

fetch("projects.json")
.then(response  => response.json())
.then(data      => ListBuilder(data))
.catch(error    => {console.error("Error!", error)});


// EVENT HANDLERS
