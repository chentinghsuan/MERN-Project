import React , {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const RegisterComponent = () => {
    const navigate = useNavigate();
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [role, setRole] = useState("")
    let [message, setMessage] = useState("")

    const handleChangeUsername = (e) =>{
        setUsername(e.target.value)
    }
    const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) =>{
        setPassword(e.target.value)
    }
    const handleChangeRole = (e) =>{
        setRole(e.target.value)
    }
    const handleRegister = ()=>{
        AuthService.register(username, email, password, role)
        .then(()=>{
            window.alert("註冊成功, 將導向登入畫面")
            navigate('/login')
        })
        .catch((e)=>{
            console.log(e.response);
            setMessage(e.response.data)
        })
    }
    
  return (   
        <div style={{ padding: "3rem" }} className="col-md-12">
          <div>
            {message && <div className='alert alert-danger'>{message}</div>}
            <div>
              <label htmlFor="username">Username</label>
              <input onChange={handleChangeUsername} 
              type="text" 
              className="form-control" 
              name="username" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input onChange={handleChangeEmail} type="text" className="form-control" name="email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input  onChange={handleChangePassword} type="password" className="form-control" name="password" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="role">role</label>
                <select value={role} onChange={handleChangeRole} className="form-control" name="role">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
            </div>
            <br />
            <button onClick={handleRegister} className="btn btn-primary btn-block" >
              <span>Register</span>
            </button>
            <Link className="btn btn-primary btn-block" to="/login">
              Login
            </Link>
          </div>
        </div>
      );  
}

export default RegisterComponent
