const newsLoad=async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`;
    const res=await fetch(url);
    const data=await res.json();
    displayNews(data.data.news_category);
}

const displayNews=(newses)=>{
    const newsContainer=document.getElementById('news-container');
    

    newses.forEach(news=>{
        const newsDiv=document.createElement('div');
        newsDiv.classList.add('display');
        newsDiv.innerHTML=`
        <a href="#" onclick="newsCategoryDetails('${news.category_id}')" class="category"> ${news.category_name}</a>
        `;
        newsContainer.appendChild(newsDiv);
    })
}


newsLoad();

const newsCategoryDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayCategoryDetails(data.data);
}

const displayCategoryDetails=(details)=>{
    const categoryContainer=document.getElementById('category-container');
    categoryContainer.innerText='';

    details.forEach(detail=>{
        const categoryDiv=document.createElement('div');
        categoryDiv.classList.add('row');
        categoryDiv.innerHTML=`
            <div class="col-lg-4 col-md-12">
                <img class="h-100 img-fluid" src="${detail.thumbnail_url}">
            </div>
            <div class="col-lg-8 col-md-12">
                <h3>${detail.title}</h3>
                <p class="elipsis">${detail.details}</p>
                <div class="row">
                    <div class="col-lg-4 col-md-12">
                        <img class="img-fluid w-25 rounded-circle" src="${detail.author.img}">
                        <span>${detail.author.name}</span>
                    </div>
                    <div class="col-lg-4 col-md-12 mt-2">View: ${detail.total_view}</div>
                    <div class="col-lg-4 col-md-12">
                        <button class="btn btn-primary" onclick="loadNewsDetails('${detail.id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">See Details</button>
                    </div>
                </div>
            </div>

        `;
        categoryContainer.appendChild(categoryDiv);
    })
}


const loadNewsDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/news/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    console.log(data.data);
}


// const displayNewsDetails=newsDetail=>{

//     newsDetail.forEach(newDetail=>{
//         console.log(newDetail)
//         const newsDetails=document.getElementById('newsDetails');
//         newsDetails.innerHTML=`

//     `;

//     })
    
// }