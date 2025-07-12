import dataset from "./data.json" with { type: "json" };
// import dataset from "./tmp_data.json" with { type: "json" };

const cagetories = ['All', 'Humanities/Social Science', 'Other', 'Math', 'Physics', 'Computer Science/AI', 'Biology/Medicine', 'Chemistry', 'Engineering']

const createSelect = () => {
    const selectElement = document.createElement('select');
    selectElement.id = 'select_catergory';
    const optionsData = cagetories.map(v => {
	return {
	    value: v,
	    text: v
	}
    })
    optionsData.forEach(optionInfo => {
	const option = document.createElement('option');
	option.value = optionInfo.value;
	option.textContent = optionInfo.text;
        option.selected = optionInfo.value === 'All'; // default All
	selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
	console.log("selectedValue", selectedValue);
	draw(selectedValue);
    })
    
    return selectElement
}


const draw = (filterValue = 'All') => {
    const container = document.getElementById("container");
    container.innerHTML = ''; // clear

    const data = dataset.content.filter(v => {
	if(filterValue === 'All') {
	    return true
	}
	return v['category'] === filterValue
    })
    
    const total_count = document.createElement("div");
    total_count.className = 'total-count';
    total_count.textContent = 'Total: ' + data.length;
    container.appendChild(total_count);
    
    data.forEach(item => {
	const content_div = document.createElement("div");
	content_div.className = 'content';
	
	const id = document.createElement("p");
	id.className = "id";
	id.textContent = "id: " + item["id"];
	const div_qa = document.createElement("div");
	div_qa.className = "qa";
	
	["question", "ja"].forEach(key => {
            const el = document.createElement("div");
            el.className = key;
            
            el.textContent = item[key];
            div_qa.appendChild(el);
	})
	const answer = document.createElement("p");
	answer.className = "answer";
	answer.textContent = "answer: " + item["answer"];

	const has_image = document.createElement("p");
	has_image.className = "has_image";
	has_image.textContent = item["has_image"] === 'has_image' ? 'has image' : 'no image'
	
	const category = document.createElement("p");
	category.className = "category";
	category.textContent = "category: " + item["category"]
	
	content_div.appendChild(id);
	content_div.appendChild(div_qa);
	content_div.appendChild(answer);
	content_div.appendChild(category);
	content_div.appendChild(has_image);
	
	container.appendChild(content_div);
    });
}

const init = () => {
    const header = document.getElementById("header");
    container.innerHTML = ''; // clear
    
    const select_ele = createSelect();
    header.appendChild(select_ele);
    
    draw('All')

    renderMathInElement(container, {
	delimiters: [
            { left: "$", right: "$", display: false },
            { left: "$$", right: "$$", display: true }
	],
	throwOnError: false
    });
}

window.addEventListener("DOMContentLoaded", init)
