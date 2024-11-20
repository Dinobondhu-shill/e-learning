import api from "@/components/ui/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputData = async (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignUpData({ ...signupData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
      
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupData : loginData;
    if(type==="signup"){
      const res = await api.post('/user/register', inputData)
      console.log(res.data)
      if(res.data.success){
        localStorage.setItem("token", res.data.token)
      }
      alert("register successfull")
    }
    else{
      const res = await api.post('/user/login', inputData)
      if(res.data.success){
        localStorage.setItem("token", res.data.token)
      }
      alert("login successfull")
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Sign Up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={signupData.name}
                onChange={(e) => handleInputData(e, "signup")}
                required
                placeholder="Enter Name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={signupData.email}
                onChange={(e) => handleInputData(e, "signup")}
                id="email"
                required
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={signupData.password}
                onChange={(e) => handleInputData(e, "signup")}
                id="password"
                required
                placeholder="Type Password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("signup")}>
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login your password here. After signup, you'll be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleInputData(e, "login")}
                id="email"
                required
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleInputData(e, "login")}
                id="password"
                required
                placeholder="Type Password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("login")}>Log In</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;
