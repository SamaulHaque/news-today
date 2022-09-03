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
        <div>
        <a href="#" onclick="newsCategoryDetails('${news.category_id}')" class="category"> ${news.category_name}</a>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}


newsLoad();

const newsCategoryDetails=async id=>{

    loader(true);//spiner loading start

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

                <div class="col-lg-4 col-md-12 mt-2"><i class="fa-regular fa-eye"></i> ${detail.total_view}</div>
                <div class="col-lg-4 col-md-12">
                    <button class="btn btn-primary" onclick="loadNewsDetails('${detail._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">See Details</button>
                </div>
              </div>
            </div>
        `;
        categoryContainer.appendChild(categoryDiv);
        
    })
    loader(false);//spiner loading end

    //news items count
    const itemsCountField=document.getElementById('items-count-field');
    const itemsCuantity=details.length;
    const defaultText='Items Found For This Category'
    itemsCountField.value=`${itemsCuantity} ${defaultText}`;
    
}


const loader=isLoading=>{
    const loader=document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}


const loadNewsDetails=async _id=>{
    const url=`https://openapi.programming-hero.com/api/news/${_id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayNewsDetails(data.data);
}


const displayNewsDetails=(detail)=>{
        
        detail.forEach(detailNews=>{
            const newsTitle=document.getElementById('newsDetailsModalLabel')
            newsTitle.innerText=detailNews.title ? detailNews.title : 'Title not found';

            console.log(detailNews);
            const modalBodyDiv=document.getElementById('news-details-body');
            modalBodyDiv.innerHTML=`
                <p>Category Id: ${detailNews.category_id ? detailNews.category_id: 'Category Id Not Found'}</p>

                <p>Author Name: ${detailNews.author.name ? detailNews.author.name: 'Author Name Not Found'}</p>

                <p>Publish Date: ${detailNews.author.published_date ? detailNews.author.published_date: 'Publish Not Found'}</p>

                <img src="${detailNews.thumbnail_url}">

                <p>Details: ${detailNews.details ? detailNews.details: 'Details Not Found'}</p>

                <p>Number: ${detailNews.rating.number ? detailNews.rating.number: 'Number Not Found'}</p>

                <p>Badge: ${detailNews.rating.badge ? detailNews.rating.badge: 'Badge Not Found'}</p>

                <p>Total View: ${detailNews.total_view ? detailNews.total_view: 'Total View Not Found'}</p>
            `
        })

}