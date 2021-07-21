let id = null;

async function getPosts(){
    let res = await fetch('http://localhost/api.rest/posts');
    let posts = await res.json();

    document.querySelector(".post-list").innerHTML = '';

    posts.forEach((post)=>{
        document.querySelector(".post-list").innerHTML +=
            `<div className="card" style="width: 18rem">
                <div className="card-body">
                    <h5 className="card-title">${post.title}</h5>
                    <p className="card-text">${post.body}</p>
                    <a href="#" className="card-link">Подробнее</a>
                    <a href="#" className="card-link" onclick="removePost(${post.id})">Удалить</a>
                    <a href="#" className="card-link" onclick="selectPost('${posts.id}', '${posts.title}', '${posts.body}')">Редактировать</a>
                </div>
            </div>`
    });
}
async function addPost(){
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);

    const res = await fetch('http://localhost/api.rest/posts/', {
        method: 'POST',
        body: formData
    })
    const data = await res.json();

    if(data.status === true){
       await getPosts();
    }
}
async function removePost(id){
    const res = await fetch(`http://localhost/api.rest/posts/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    if(data.status === true){
        await getPosts();
    }
}

async function selectPost(id, title, body){
    id = id;
    document.getElementById('title-edit').value = title;
    document.getElementById('body-edit').value = body;
}
async function updatePost(id){
    const title = document.getElementById('title-edit').value,
          body = document.getElementById('body-edit').value;
    const data = {
        title: title,
        body: body
    }
    const res = await fetch(`http://localhost/api.rest/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })

    const resData = res.json();

    if(resData.status === true){
        await getPosts();
    }

}

getPosts();
