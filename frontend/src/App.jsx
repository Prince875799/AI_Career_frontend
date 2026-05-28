import React from "react";
import Home from "./pages/Home";
import {Routes, Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import ResumeBuilder from "./pages/ResumeBuilder";
// import CareerRoadmap from "./pages/CareerRoadmap";
// import AskAI from "./pages/AskAI";
// import MockInterview from "./pages/interview";
import CareerForm from "./pages/CareerForm";
import Roadmap from "./pages/Roadmap";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import Step2Page from "./pages/Step2Page";
import Step1Page from "./pages/Step1Page";
import Step3Page from "./pages/Step3Page";
import CombineDashboard from "./pages/CombineDashboard";
const App = () => {
  return (
    <>
    <AuthContext>
      <UserContext>
      <Routes>
         <Route path="/step1page" element={< Step1Page/>}/>
         <Route path="/step2page" element={< Step2Page/>}/>
         <Route path="/step3page" element={< Step3Page/>}/>
         <Route path="/q" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/builder' element={<ResumeBuilder/>}></Route>
        {/* <Route path='/career' element={<CareerRoadmap/>}></Route> */}
        {/* <Route path='/interview' element={<MockInterview/>}></Route> */}
        {/* <Route path='/ask' element={<AskAI/>}></Route> */}
        <Route path="/c" element={<CareerForm />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/combinedashboard" element={<CombineDashboard />}>
           <Route path="builder" element={<ResumeBuilder />} />
          <Route path="c" element={<CareerForm/>} />
          <Route path="q" element={<LandingPage />} />
         </Route>

        {/* OLD CHAT FEATURE */}
        {/* <Route path="/chat" element={<AskAI />} /> */}
      </Routes>
      </UserContext>
    </AuthContext>
      
    </>
  );
};

export default App;