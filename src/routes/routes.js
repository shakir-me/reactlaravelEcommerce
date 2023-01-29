
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import AddCategory from '../components/admin/category/AddCategory';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';

const routes=[
   
    { path: '/admin', exact: true, name: 'Admin' },

    {path:'/admin/dashboard',exact:true, name: 'Dashboard',  component:Dashboard},
    {path:'/admin/profile',exact:true, name: 'Profile',  component:Profile},
    {path:'/admin/add-category',exact:true, name: 'AddCategory',  component:AddCategory},
    {path:'/admin/view-category',exact:true, name: 'ViewCategory',  component:ViewCategory},
    {path:'/admin/edit-category/:id',exact:true, name: 'EditCategory',  component:EditCategory},
];
export default routes;