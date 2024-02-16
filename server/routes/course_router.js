const express = require("express");
const { course } = require(".");
const router = express.Router()
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next)=>{
    console.log("一個request將進入這個api");
    next()
})

router.get("/", async (req, res)=>{
    try{
        const courses = await Course.find({})
        .populate("instructor",["username","email"])
        res.send(courses)
    }catch(e){
        console.log(e);
        res.status(400).send("cannot get courses")
    }
})

router.get("/instructor/:_instructor_id", (req, res) => {
    let { _instructor_id } = req.params;
    Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(500).send("Cannot get course data.");
      });
  });

  router.get("/findByName/:name", (req, res)=>{
    let {name} = req.params;
    let regex = new RegExp(name, 'i');
    Course.find({title:regex}).populate("instructor",[
        "username",
        "email"
    ]).then((course)=>{
        res.status(200).send(course);
    }).catch((e)=>{
        res.status(500).send(e)
    })
  })


router.get("/student/:_student_id", (req, res)=>{
    let {_student_id} = req.params;
    Course.find({students: _student_id}).populate("instructor", [
        "username",
        "email"
    ]).then((courses)=>{
        res.status(200).send(courses)
    }).catch((e)=>{
        res.status(500).send("無法取得")
    })
})

router.get("/:_id", async (req, res)=>{
    let {_id} = req.params;
    try{
        const courseResult = await Course.findOne({_id})
        courseResult.populate()
        res.send(courseResult)
    }catch(e){
        res.send(e)
    }
    
})

router.post("/", async (req, res)=>{
    const {error} = courseValidation(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    let {title, description, price} = req.body
    if (req.user.isStudent()){
        res.status(400).send("只有instructor可以開課")
    }
    let newCourse = new Course({
        title,
        description,
        price,
        instructor:req.user._id    
    })

    try{
        await newCourse.save()
        res.status(200).send("新課程已被建立")
    }catch(e){
        res.status(400).send("課程建立失敗")
    }
});

router.post("/enroll/:_id", async(req, res)=>{
    let _id = req.params;
    let {user_id} = req.body;
    try{
        let course = await Course.findOne({_id})
        course.students.push(user_id);
        await course.save();
        res.send("註冊成功")
    }catch(e){
        res.send(e)
    }
})

router.patch("/:_id", async (req, res)=>{
    const {error} = courseValidation(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    let {_id} = req.params;
    let course = await Course.findOne({_id})
    if(!course){
        res.status(404)
        return res.json({
            success:false,
            message:"找不到課程"
        })
    }

    if(course.instructor.equals(req.user._id || req.user.isAdmin())){
        Course.findOneAndUpdate({_id}, req.body, {
            new:true,
            runValidator:true
        }).then(()=>{
                res.send("課程已更新")
            }
        ).catch((e)=>{
            res.send({
                success:false,
                message:e
            })
        })        
    }else{
        res.send(403)
        return res.json({
            success:false,
            message:"你對該課程沒有權限"
        })
    }
});

router.delete("/:_id", async (req, res)=>{
    let {_id} = req.params;
    let course = await Course.findOne({_id})
    if(!course){
        res.status(404)
        return res.json({
            success:false,
            message:"找不到課程"
        })
    }

    if(course.instructor.equals(req.user._id || req.user.isAdmin())){
        Course.deleteOne({_id})
        .then(()=>{
                res.send("課程已刪除")
            }
        ).catch((e)=>{
            res.send({
                success:false,
                message:e
            })
        })        
    }else{
        res.send(403)
        return res.json({
            success:false,
            message:"只有課程持有者以及admin可刪除"
        })
    }
})

module.exports = router