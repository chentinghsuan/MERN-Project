import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';
import { useState , useEffect} from 'react';

const CourseComponent = (props) => {
    let {currentUser, setCurrentUser} = props;
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login")
    };

    let [courseData, setCourseData] = useState(null)
    useEffect(()=>{
        console.log("using effect");
        let _id;
        if (currentUser){
            _id = currentUser.user._id
        }else{
            _id = ""
        };

        if (currentUser.user.role == "instructor"){
            CourseService.get(_id)
            .then((data)=>{
                setCourseData(data.data);
        })  
            .catch((e)=>{
                console.log(e);
        })
        }else if (currentUser.user.role == "student"){
            CourseService.getEnrolledCourses(_id).then((data)=>{
                console.log(data);
                setCourseData(data.data)
            }).catch((e)=>{
                console.log(e);
            })
        }
        
    },[])

  return (
    <div style={{padding:"3rem"}}>
      {
        !currentUser && (
            <div>
                <p>你必須先登入才能查看</p>
                <button onClick={handleTakeToLogin} className='btn btn-primary btn-lg'>
                    Login
                </button>
            </div>
        )
      }

      {
        currentUser && currentUser.user.role == "instructor" && 
            <div>
                <h1>Welcome to instructor's page.</h1>
            </div>
        
      }
      {
        currentUser && currentUser.user.role == "student" && 
            <div>
                <h1>Welcome to student's page.</h1>
            </div>
        
      }
      {
        currentUser && courseData && courseData.length != 0 &&(
            <div>
                <p>以下是您的課程</p>
                {
                    courseData.map((course)=>{
                        return(
                        <div className='card' style={{width:"18rem"}} key={course._id}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p>學生人數: {course.students.length}</p>
                                <button className='btn btn-primary '>{course.price}</button>
                                
                            </div>
                        </div>
                    )})
                }
            </div>
        )
      }
      
    </div>
  )
}

export default CourseComponent
