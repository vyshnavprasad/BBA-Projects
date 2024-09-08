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
        let projectElement = document.createElement("a");
        projectElement.href = project.href;
        projectElement.target = "_blank";
        projectElement.classList.add("board");

        let projectContainer = document.createElement("div");
        projectContainer.href = project.href;
        projectContainer.classList.add("card");


        let elementTitle = document.createElement("h1");
        elementTitle.textContent =  `#${index} ` + project.title;

        let elementContent = document.createElement("h3");
        elementContent.textContent = project.caption;
        projectContainer.append(elementTitle, elementContent);
        projectElement.appendChild(projectContainer);
        page.append(projectElement);    
    }
}

fetch("projects.json")
.then(response  => response.json())
.then(data      => ListBuilder(data))
.catch(error    => {console.error("Error!", error)});


// EVENT HANDLERS
