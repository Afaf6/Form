
import { useState } from 'react';
import './App.css';
import * as yup from "yup";

function App() {
  const [formData, setFormeData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    age:0,
    gender:"",
    massage:"",
    rulesaccept: false,
});
 
const [errorsObject, setErrorsObject] = useState({});

const userSchema =yup.object().shape({
   firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    email: yup.string().email().required("Please enter a valid email address"),
    age: yup.number().required("Please enter your age").positive().integer().min(18).max(80),
    massage: yup.string().required("This field is required"),
    gender: yup.string().oneOf(["Male","Female"]).required("Please select your gender"),
    rulesaccept: yup.boolean().oneOf([true]).required("To submit this form, please consent to being contacted"),
});

async function testValidation(){
  try {
    const response = await userSchema.validate(formData, {abortEarly:false});
    console.log(response, "Is Vaild Object");
  } 
  
  catch (err) {
    var errors = {};
    console.log(err.inner)
    err.inner.forEach((error) => {
      console.log( ` ${error.path} : ${error.message} `);
      errors[error.path] = error.message
    });
    setErrorsObject(errors);
    console.log(errors)
  }
  
}

  function handleOnFormSubmit(event) {
     console.log(formData);
     testValidation()
     event.preventDefault();
  }

  function handleOnChange(event){
    const keyName = event.target.name ;
    var keyValue = event.target.value;
    const type = event.target.type;

    if (type == "checkbox") {
      console.log(event.target.checked)
      keyValue = event.target.checked;
    }
    setFormeData({
      ...formData,
      [keyName]: keyValue,
    })
  }
  return (
    <>
     <form onSubmit={handleOnFormSubmit}>
      <h1 id="title">Contact Us</h1>
      <div id="Name">
        <div className='name1'>
        <label htmlFor="firstName"> First Name <span>*</span> </label>
       <input 
       id="firstName"
       onChange={handleOnChange}
       value={formData.firstName}
       name="firstName"
       ></input>
       {errorsObject.firstName ? <p>{errorsObject.firstName}</p> : null}
       </div>

       <div className='name1'>
       <label htmlFor="lastdName"> Last Name <span>*</span> </label>
       <input 
       id="lastName"
       onChange={handleOnChange}
       value={formData.lastName}
       name="lastName"
       ></input>
       {errorsObject.lastName ? <p>{errorsObject.lastName}</p> : null}
       </div>
      </div>

      <div className="contentlebal">
       <label htmlFor="email"> Email <span>*</span> </label>
       <input
       onChange={handleOnChange}
       value={formData.email}
       name="email"
       type="email"
       ></input>
       {errorsObject.email ? <p>{errorsObject.email}</p> : null}
      </div>
       

      <div className="contentlebal">
      <label htmlFor="age" > Age <span>*</span> </label>
       <input
       onChange={handleOnChange}
       value={formData.age}
       name="age"
       type="number"
       ></input>
       {errorsObject.age ? <p>{errorsObject.age}</p> : null}
      </div>

       <div className="contentlebal">
      <label htmlFor="massage"> Massage  <span>*</span> </label>
       <textarea
       onChange={handleOnChange}
       value={formData.massage}
       name="massage"
       ></textarea>
       {errorsObject.massage ? <p>{errorsObject.massage}</p> : null}
      </div>

      <div className="genderdiv">
        <label htmlFor="gender"> Gender <span>*</span> </label>
        
        <div className="types">
         <div className="typegender">
          <input type="radio" name="gender" onChange={handleOnChange} value="Male" ></input>
          <label htmlFor="gender">Male</label>
        </div>

        <div className="typegender">
          <input type="radio" name="gender" onChange={handleOnChange} value="Female" ></input>
          <label htmlFor="gender">Femal</label>
        </div> 
        </div>
        {errorsObject.gender ? <p>{errorsObject.gender}</p> : null}
        
      </div>
      

     

      <div id="selectbox">
        <input
        name="rulesaccept"
        type="checkbox"
        onChange={handleOnChange}
        checked={formData.rulesaccept}
        ></input>
        <label> I consent to being contacted by the team  <span>*</span> </label>
      </div>
      {errorsObject.rulesaccept ? <p>{errorsObject.rulesaccept}</p> : null}
      
      <button id="submitbtn" type="submit" disabled={!formData.rulesaccept}>Submit</button>
     </form>
    </>
  )
}

export default App

{/* {errorsArray.map((errors)=> {
        if (error.key == "email") {
          return <label>{error.massage}</label>
        }
       })} */}