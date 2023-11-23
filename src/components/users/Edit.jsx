import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validationUserData } from '../../vaildation/uservaildation.js';
import Loader from '../Loader.jsx';
import Input from '../shared/Input.jsx';

function Edit() {
  const navigate = useNavigate();


  let [user, setUser] = useState({});
  const { id } = useParams('id');

  const getUser = async () => {

    const { data } = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`)
    setUser(data.user);

  }
  useEffect(() => {
    getUser();
  }, [])

  let [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  let [errorBack, setErrorBack] = useState('');

  let [loader, setLoader] = useState(false);




  const changeData = (e) => {


    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })

  }

  const sendData = async (e) => {
    e.preventDefault();

    if (Object.keys(validationUserData(user)).length > 0) {
      setErrors(validationUserData(user));
    }

    else {
      try {
        setLoader(true);
        const { data } = await axios.put(`https://crud-users-gold.vercel.app/users/${id}`, user);


        if (data.message == "success") {
          toast.success("User updated successfully");
          navigate('/user/index')
          setLoader(false)
        }
      } catch (error) {
        setErrorBack(error.responce.data.message);
        setErrors([]);
        setLoader(false)
      }

    }
  }
  if (loader) {

    return (
      <Loader />


    )
  }


  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <Link to={'/user/create'} className="nav-link align-middle px-0">
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li>
                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-speedometer2" /> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  <li className="w-100">
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
              </li>
              <li>
                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                  <i className="fs-4 bi-bootstrap" /> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                  <li className="w-100">
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-grid" /> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                  <li className="w-100">
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col py-3">

          {errorBack && <p className='text text-danger'>{errorBack}</p>}

          <form className='w-50 border py-4 bg-danger-subtle mt-5 ms-3' key={user._id} onSubmit={sendData}>

            <Input errors={errors} id={'username'} title={'user name'} type={'text'} name={'name'} value={user.name} changeData={changeData} />

            <Input errors={errors} id={'email'} title={'user email'} type={'email'} name={'email'} value={user.email} changeData={changeData} />

            <Input errors={errors} id={'password'} title={'user password'} type={'password'} name={'password'} value={user.password} changeData={changeData} />



            <div className="mb-3 w-75 m-auto">
              <input type="submit" className='form-control' value='Update user' />

            </div>



          </form>





        </div>
      </div>
    </div>
  )
}

export default Edit