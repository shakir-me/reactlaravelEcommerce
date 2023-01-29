import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
function Category(){

    const history = useHistory();
    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        status: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
    }

    const categorySubmit = (e) => {
        e.preventDefault();
        
        const data = {
            name: categoryInput.name,
            slug: categoryInput.slug,
            description: categoryInput.description,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
            status: categoryInput.status,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/store-category`, data).then(res => { 
                if(res.data.status === 200)
                {
                    swal("Success",res.data.message,"success");
                    document.getElementById('CATEGORY_FORM').requestFullscreen();
                    
                }
                else  if(res.data.status===400)
                {
                    setCategory({...categoryInput, error_list: res.data.errors});
                }
            });
        });
    }


    var display_errors =[];
    if (categoryInput.error_list) 
    {
      display_errors=[
        categoryInput.error_list.slug,
        categoryInput.error_list.name,
      ]    
    }

    return (
        <div className="container-fluid px-4">
         <h1 className="mt-4">Add Category</h1>
         {
            display_errors.map( (item)=>{
           return ( <p className="mb-1" key={item}>{item}</p> )
            })
         }
         <form onSubmit={categorySubmit}>
         <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Seo Tags</button>
                </li>
                
                </ul>
                <div class="tab-content" id="myTabContent">
                <div class="tab-pane card-body border  fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                   
                    <div className="form-group mb-3">
                        <label>SLug</label>
                        <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />   
                      
                     </div>

                     <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />   
                     </div>
                     <div className="form-group mb-3">
                        <label>Description </label>
                        <textarea  name="description"  onChange={handleInput} value={categoryInput.description} className="form-control" ></textarea>
                     </div>

                     <div className="form-group mb-3">
                        <label>Status :</label>
                        <input type="checkbox" name="status"  onChange={handleInput} value={categoryInput.status} />    Status 0=shown/1 =hidden
                     </div>

                  

                   </div>
                  <div class="tab-pane card-body border  fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                   <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title}  className="form-control" />   
                     </div>
                     <div className="form-group mb-3">
                        <label>Meta Keyword </label>
                        <textarea  name="meta_keyword"  onChange={handleInput} value={categoryInput.meta_keyword}  className="form-control" ></textarea>
                     </div>

                     <div className="form-group mb-3">
                        <label>Meta Description </label>
                        <textarea  name="meta_description"  onChange={handleInput} value={categoryInput.meta_description} className="form-control" ></textarea>
                     </div>
                </div>
              
             </div>
             <button type="submit" className="btn btn-primary px-4">Submit</button>
            </form>
         </div>
    )
}

export default Category;