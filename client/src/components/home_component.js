import React from 'react'

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Learning System</h1>
            <p className="col-md-8 fs-4">
              此作品由MERN組成
              <br />
              Mongo、Express.js、React.js、Node.js
              <br />
              將來預計新增購物車功能, 並用MySql實作
              <br />
              登入時role請選擇instructor or student
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              此按鈕尚未安排功能
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a Student</h2>
              <p>
                學生可以註冊課程, 尚未實作購買的功能
                由於只是一個作品展示的課程, 請不要提供任何個人訊息
                以下提供一個測試用的帳號可直接登入
                <br />
                email:test1@gmail.com
                <br />
                password:123456
              </p>
              <button className="btn btn-outline-light" type="button">
                登入或註冊
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As an Instructor</h2>
              <p>
                instrictor可以註冊課程, 由於只是一個作品展示的課程, 請不要提供任何個人訊息
                以下提供一個測試用的帳號可直接登入
                <br />
                <br />
                email:god1456920@gmail.com 
                <br />
                password:123456
              </p>
              <button className="btn btn-outline-secondary" type="button">
                登入或註冊
              </button>
            </div>
          </div>
        </div>        
      </div>
    </main>
  )
}

export default HomeComponent
