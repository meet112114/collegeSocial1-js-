import React , {useState } from 'react'
import signinimg from "../images/signin-image.jpg";
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css'
const Login = () => {

  
    const navigate = useNavigate();
    const [email ,setEmail] = useState('');
    const [password , setPassword] = useState('');


    const loginUser = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch('http://localhost:8000/user/login/' , {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"

            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        console.log(data.message)

        if(res.status === 400 || !data){
            window.alert("Invalid credentials");
            console.log("invalid credenials");
        }else {
           
            window.alert("Login successful");
            console.log("Login successful");
            navigate('/if');

           
    switch (data.message) {
      case '07fae77fabb6b74bc2624cdc3dbc50fb3b2ab73b':
        navigate('/if');
        break;
      case 'eb58d9f8f4b88ea5f8f74e26c8951332b00157ae':
        navigate('/co');
        break;
      case '48b8f153d7013169cf003ba0cd3b56945033d1cb':
        navigate('/me');
        break;
      case '4773bfdd9baf4aec539488aefa7ab7c0aa98f55d':
        navigate('/ee');
        break;
      case '340713be7602a015bf87e234af423b7369e21f80':
        navigate('/ej');
        break;
      default:
        navigate('/');
    }
        }

        }catch(e){
            console.log(e)
        }
        

        
       

    }

  return (
    <>
       <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src={signinimg} alt="sing up image"/></figure>
                        {/* <Link to="/Signup" className="signup-image-link">Create an account</Link> */}
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Login</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="email" id="your_name" placeholder="email" 
                                value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock material-icons-name"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password" 
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" onClick={loginUser}/>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>


    </>
  )
}

export default Login