import React , {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import HomeComponent from "./components/home_component";
import NavComponent from "./components/nav_component";
import RegisterComponent from "./components/register_component";
import LoginComponent from "./components/login_component";
import ProfileComponent from "./components/profile_component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course_component"
import PostCourseComponent from "./components/postCourse_component";
import EnrollComponent from './components/enroll_component'

function App(){
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div>
      <NavComponent currentUser={currentUser} 
      setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path="/" element={<HomeComponent 
                              currentUser={currentUser}
                              setCurrentUser={setCurrentUser}/>} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent 
                              currentUser={currentUser}
                              setCurrentUser={setCurrentUser}/>} />
        <Route path="/profile" element={<ProfileComponent 
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}/>} />
        <Route path="/course" element={<CourseComponent 
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}/>} />
        <Route path="/postCourse" element={<PostCourseComponent 
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}/>} /> 
        <Route path="/enroll" element={<EnrollComponent 
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}/>} />     

         
        
      </Routes>
        
      <footer className="pt-3 mt-4 text-muted border-top" style={{ textAlign: 'center' }}>
            &copy; 2024
      </footer>
    </div>
  );
}

export default App;
