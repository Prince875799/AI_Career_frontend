export const generateCareerRoadmap = async(req,res)=>{

const {skill}=req.body;

try{

const roadmap = [
"Learn Basics",
"Build Projects",
"Master Frameworks",
"Apply for Jobs"
];

res.json({
success:true,
roadmap
});

}catch(error){
res.json({success:false,message:error.message});
}

};