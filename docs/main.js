const cagetories = ['All', 'Humanities/Social Science', 'Other', 'Math', 'Physics', 'Computer Science/AI', 'Biology/Medicine', 'Chemistry', 'Engineering']
let dataset = {content: []}
let page = 1

// ================================================== //
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
	if(dataset.content.length != 0) {
	    new Promise(r => r(draw(selectedValue)))
	}
    })
    return selectElement
}

const draw = (filterValue = 'All') => {
    const container = document.getElementById("container");
    container.innerHTML = '';

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
	has_image.textContent = item["image"] === 'has image' ? 'has image' : 'no image';
	
	const category = document.createElement("p");
	const cate_idx = cagetories.findIndex(v => v === item['category'])
	category.className = "category-"+cate_idx;
	category.textContent = "category: " + item["category"];

	const btn = document.createElement("button");
	btn.innerHTML = 'show tex';
	btn.addEventListener('click', (event) => {
	    renderMathInElement(content_div, {
		delimiters: [
		    { left: "$", right: "$", display: false },
		    { left: "$$", right: "$$", display: true }
		],
		throwOnError: false
	    });
	})
	
	content_div.appendChild(id);
	content_div.appendChild(div_qa);
	content_div.appendChild(answer);
	content_div.appendChild(category);
	content_div.appendChild(has_image);
	content_div.appendChild(btn);
	container.appendChild(content_div);
    });
}

const init = () => {
    const load_ele = document.getElementById("load");
    load_ele.innerHTML = 'loading'
    
    const header_ele = document.getElementById("header");
    const select_ele = createSelect();
    header_ele.appendChild(select_ele);

    // fetch('./tmp_data.json')
    fetch('./data.json')
	.then(r => r.json())
	.then(r => {
	    dataset = r
	    return new Promise((r) => r(draw('All')))
	})
	.then(() => {
	    load_ele.innerHTML = ''
	});
}

window.addEventListener("DOMContentLoaded", init)
