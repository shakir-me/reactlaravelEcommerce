import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
function EditBrand(props){

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        
        const brand_id = props.match.params.id;
        axios.get(`/api/edit-brand/${brand_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-brand');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
    }

const updateBrand= (e) =>{
    e.preventDefault();
    const brand_id = props.match.params.id;
    const data = categoryInput;
    axios.put(`/api/update-brand/${brand_id}`, data).then(res=>{

        if(res.data.status === 200)
        {
            swal("Success",res.data.message,"success");
            setError([]);
        }
        else if(res.data.status === 422)
        {
            swal("All fields are mandetory","","error");
            setError(res.data.errors);
        }
        else if(res.data.status === 404)
        {
            swal("Error",res.data.message,"error");
            history.push('admin/view-brand');
        }

    });
}




    if(loading)
    {
        return <h4>Loading Edit brand...</h4>
    }

  return (
    <div className="container-fluid px-4">
    <h1 className="mt-4">Edit Brand</h1>
    <Link to="/admin/view-brand" className="btn btn-primary btn-sm float-end">All brand</Link>
   
    <form  onSubmit={updateBrand}>
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
                   <small className="text-danger">{error.slug}</small>
                </div>

                <div className="form-group mb-3">
                   <label>Name</label>
                   <input type="text" name="name" onChange={handleInput} value={categoryInput.name}  className="form-control" />   
                   <small className="text-danger">{error.name}</small>
                </div>
                <div className="form-group mb-3">
                   <label>Description </label>
                   <textarea  name="description" onChange={handleInput} value={categoryInput.description}  className="form-control" ></textarea>
                </div>

                <div className="form-group mb-3">
                   <label>Status :</label>
                   <input type="checkbox" name="status"  onChange={handleInput} value={categoryInput.status}  />    Status 0=shown/1 =hidden
                </div>

             

              </div>
             <div class="tab-pane card-body border  fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

              <div className="form-group mb-3">
                   <label>Meta Title</label>
                   <input type="text" name="meta_title"  onChange={handleInput} value={categoryInput.meta_title}   className="form-control" />   
                   <small className="text-danger">{error.meta_title}</small>
                </div>
                <div className="form-group mb-3">
                   <label>Meta Keyword </label>
                   <textarea  name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword}   className="form-control" ></textarea>
                </div>

                <div className="form-group mb-3">
                   <label>Meta Description </label>
                   <textarea  name="meta_description" onChange={handleInput} value={categoryInput.meta_description}   className="form-control" ></textarea>
                </div>
           </div>
         
        </div>
        <button type="submit" className="btn btn-primary px-4">Update</button>
       </form>
    </div>
  )

}
    export default EditBrand;